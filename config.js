System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime",
      "es7.decorators",
      "es7.classProperties"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "aurelia-binding": "github:aurelia/binding@0.8.2",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.0",
    "aurelia-framework": "github:aurelia/framework@0.13.3",
    "babel": "npm:babel-core@5.5.2",
    "babel-runtime": "npm:babel-runtime@5.5.2",
    "bluebird": "npm:bluebird@2.9.27",
    "core-js": "npm:core-js@0.9.18",
    "github:aurelia/binding@0.8.2": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.0",
      "aurelia-metadata": "github:aurelia/metadata@0.7.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.9.0": {
      "aurelia-logging": "github:aurelia/logging@0.6.1",
      "aurelia-metadata": "github:aurelia/metadata@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/framework@0.13.3": {
      "aurelia-binding": "github:aurelia/binding@0.8.2",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.0",
      "aurelia-loader": "github:aurelia/loader@0.8.2",
      "aurelia-logging": "github:aurelia/logging@0.6.1",
      "aurelia-metadata": "github:aurelia/metadata@0.7.0",
      "aurelia-path": "github:aurelia/path@0.8.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.13.11",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/loader@0.8.2": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-metadata": "github:aurelia/metadata@0.7.0",
      "aurelia-path": "github:aurelia/path@0.8.0",
      "core-js": "npm:core-js@0.9.18",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.3"
    },
    "github:aurelia/metadata@0.7.0": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating@0.13.11": {
      "aurelia-binding": "github:aurelia/binding@0.8.2",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.0",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.8.2",
      "aurelia-logging": "github:aurelia/logging@0.6.1",
      "aurelia-metadata": "github:aurelia/metadata@0.7.0",
      "aurelia-path": "github:aurelia/path@0.8.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.5.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:bluebird@2.9.27": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

