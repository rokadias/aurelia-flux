# aurelia-flux
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/tfrydrychewicz/aurelia-flux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) 
[![Travis CI](https://travis-ci.org/tfrydrychewicz/aurelia-flux.svg)](https://travis-ci.org/tfrydrychewicz/aurelia-flux)

A Flux plugin for [Aurelia](http://www.aurelia.io/).

``` javascript
import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';

@inject(Dispatcher)
export class Welcome{
  
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  submit(){
    this.previousValue = this.fullName;    
    this.dispatcher.dispatch('submit', `Welcome, ${this.fullName}!`);
  }
  
  @handle('submit')
  submitHandler(event, message) {
    alert(message);
  }
  
  @handle('submit')
  anotherSubmitHandler(event, message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(message);
        resolve();
      }, 1000);
    });
  }
}
```

## Dependencies

* [aurelia-dependency-injection](https://github.com/aurelia/dependency-injection)
* [aurelia-binding](https://github.com/aurelia/binding)
* [aurelia-framework](https://github.com/aurelia/framework)

## Used By

This library isn't used by [Aurelia](http://www.aurelia.io/). It is an optional plugin.

## Platform Support

This library can be used in the **browser** only.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

	```shell
	npm install
	```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

	```shell
	npm install -g gulp
	```
4. To build the code, you can now run:

	```shell
	gulp build
	```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

	```shell
	npm install -g karma-cli
	```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

	```shell
	npm install -g jspm
	```
3. Install the client-side dependencies with jspm:

	```shell
	jspm install
	```

4. You can now run the tests with this command:

	```shell
	karma start
	```