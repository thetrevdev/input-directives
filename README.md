# Input Directives - WIP

***


## Usage

### Requirements

* **AngularJS v1.0.0+** is currently required.

## Installation

Add the specific modules to your dependencies, or add the entire lib by depending on `ui.utils`

```javascript
angular.module('myApp', ['id.currency', ...])
// or if ALL modules are loaded along with modules/input-directives.js
angular.module('myApp', ['id.input-directives'])
```

Each directive and filter is now it's own module and will have a relevant README.md in their respective folders

## Development

### Requirements

0. Install [Node.js](http://nodejs.org/) and NPM (should come with)

1. Install global dependencies `grunt-cli`, `bower`, and `karma`:

    ```bash
    $ npm install -g karma grunt-cli bower
    ```

2. Install local dependencies:

    ```bash
    $ npm install
    $ bower install
    ```
3. Grunt

	```bash
	$ grunt
	```

