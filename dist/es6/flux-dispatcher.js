import Promise from 'bluebird';
import {Dispatcher} from './instance-dispatcher';

export class FluxDispatcher {
    static instance = new FluxDispatcher();

    constructor() {
        this.instanceDispatchers = new Map();
        this.isDispatching = false;
        this.queue = [];
        this.typesPromises = new Map();
    }

    getOrCreateTypeDispatchers(type : Object) : Set {
        if(this.instanceDispatchers.has(type) === false) {
            this.instanceDispatchers.set(type, new Set());
        }

        return this.instanceDispatchers.get(type);
    }

    getOrCreateTypePromises(type : Object) {
        if(this.typesPromises.has(type) === false) {
            this.typesPromises.set(type, Promise.defer());
        }

        return this.typesPromises.get(type);
    }

    registerInstanceDispatcher(dispatcher : Dispatcher) {
        if(dispatcher === undefined || dispatcher.instance === undefined) {
            return;
        }

        var typeDispatchers = this.getOrCreateTypeDispatchers(Object.getPrototypeOf(dispatcher.instance));

        typeDispatchers.add(dispatcher);
    }

    unregisterInstanceDispatcher(dispatcher : Dispatcher) {
        if(dispatcher === undefined || dispatcher.instance === undefined) {
            return;
        }

        let type = Object.getPrototypeOf(dispatcher.instance);

        if(this.instanceDispatchers.has(type) === false) {
            return;
        }

        this.instanceDispatchers.get(type).delete(dispatcher);

        if(this.instanceDispatchers.get(type).size === 0) {
            this.instanceDispatchers.delete(type);
        }
    }

    dispatch(action : String, payload : any) {
        this.$dispatch(action, payload, false);
    }

    $dispatch(action : String, payload : any, fromQueue : boolean) {

        if(this.isDispatching && fromQueue === false) {
            this.queue.push([action, payload]);
            return;
        }

        this.isDispatching = true;

        this.typesPromises = new Map();

        this.instanceDispatchers.forEach((dispatchers, type) => {
            var typePromise = this.getOrCreateTypePromises(type);
            var promises = [];

            dispatchers.forEach((dispatcher) => {
               promises.push(dispatcher.dispatchOwn.apply(dispatcher, [action, payload]));
            });

            var reflects = promises.map(function(promise) { return promise.reflect(); });
            Promise.all(reflects).then(() => {
                typePromise.resolve();
            });
        });

        this.typesPromises.forEach((promise, type) => {
            if(this.instanceDispatchers.has(type) === false) {

                let name = (type !== undefined && type.constructor !== undefined && type.constructor.name !== undefined) ? type.constructor.name : type.toString();
                console.warn(`You are waiting for a type '${name}' that didn't handle event '${action}'. ${name} promise has been resolved automatically.`);

                promise.resolve();
            }
        });

        var allTypesPromises = Array.from(this.typesPromises.values()).map((defer) => { return defer.promise; });

        var allTypesReflects = allTypesPromises.map(function(promise) { return promise.reflect(); });
        Promise.all(allTypesReflects).then(() => {
            let next = this.queue.shift();
            setTimeout(() => {
                if(next !== undefined) {
                    this.$dispatch(next[0], next[1], true);
                } else {
                    this.isDispatching = false;
                }
            }, 0);
        });
    }

    waitFor(types : String|String[], handler: (() => any)) {
        if(Array.isArray(types) === false) {
            types = [types];
        }

        let typesPromises = types.map((type) => {
            return this.getOrCreateTypePromises(type.prototype).promise;
        });

        var def = Promise.defer();

        var typesReflects = typesPromises.map(function(promise) { return promise.reflect(); });
        Promise.all(typesReflects).then(() => {
           Promise.resolve(handler()).then((ret) => {
             def.resolve(ret);
           }).catch((err) => {
             def.reject(err);
           });
        });

        return def.promise;
    }
}
