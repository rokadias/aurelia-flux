SystemJS.config({
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "es7.decorators",
      "es7.classProperties"
    ]
  },
  map: {
    "babel": "npm:babel-core@5.8.24"
  },
  packages: {
    "aurelia-flux": {
      "main": "aurelia-flux.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "aurelia-binding": "github:aurelia/binding@0.9.1",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
    "aurelia-router": "github:aurelia/router@0.12.0",
    "aurelia-templating": "github:aurelia/templating@0.15.3",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "bluebird": "npm:bluebird@2.9.34",
    "core-js": "npm:core-js@1.1.4",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.9",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },
  packages: {
    "github:aurelia/binding@0.9.1": {
      "map": {
        "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
        "aurelia-metadata": "github:aurelia/metadata@0.8.0",
        "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
        "core-js": "npm:core-js@0.9.18"
      }
    },
    "github:aurelia/dependency-injection@0.10.1": {
      "map": {
        "aurelia-logging": "github:aurelia/logging@0.7.0",
        "aurelia-metadata": "github:aurelia/metadata@0.8.0",
        "core-js": "npm:core-js@0.9.18"
      }
    },
    "github:aurelia/event-aggregator@0.8.0": {
      "map": {
        "aurelia-logging": "github:aurelia/logging@0.7.0"
      }
    },
    "github:aurelia/loader@0.9.0": {
      "map": {
        "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
        "aurelia-metadata": "github:aurelia/metadata@0.8.0",
        "aurelia-path": "github:aurelia/path@0.9.0",
        "core-js": "github:zloirock/core-js@0.8.4"
      }
    },
    "github:aurelia/metadata@0.8.0": {
      "map": {
        "core-js": "npm:core-js@0.9.18"
      }
    },
    "github:aurelia/route-recognizer@0.7.0": {
      "map": {
        "aurelia-path": "github:aurelia/path@0.9.0",
        "core-js": "npm:core-js@0.9.18"
      }
    },
    "github:aurelia/router@0.12.0": {
      "map": {
        "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
        "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
        "aurelia-history": "github:aurelia/history@0.7.0",
        "aurelia-logging": "github:aurelia/logging@0.7.0",
        "aurelia-path": "github:aurelia/path@0.9.0",
        "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.7.0",
        "core-js": "npm:core-js@0.9.18"
      }
    },
    "github:aurelia/templating@0.15.3": {
      "map": {
        "aurelia-binding": "github:aurelia/binding@0.9.1",
        "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
        "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
        "aurelia-loader": "github:aurelia/loader@0.9.0",
        "aurelia-logging": "github:aurelia/logging@0.7.0",
        "aurelia-metadata": "github:aurelia/metadata@0.8.0",
        "aurelia-path": "github:aurelia/path@0.9.0",
        "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
        "core-js": "npm:core-js@0.9.18"
      }
    },
    "npm:babel-runtime@5.8.24": {
      "map": {}
    },
    "npm:bluebird@2.9.34": {
      "map": {}
    },
    "npm:core-js@0.9.18": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:core-js@1.1.4": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    }
  }
});
