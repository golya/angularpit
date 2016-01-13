
## Environment Installation
### Development tools prerequesities
Node v4.x (although v0.12.x should work as well)

### After nodejs is installed
```sh
npm install -g gulp
npm install -g bower
npm install -g yo
```

## Project Installation
### Build project dependencies
```sh
$ npm install
$ bower install
```
### Build the project
```sh
$ gulp build
```

### Watch the project files for continuous project build
```sh
$ gulp watch
```

## Routing
Using the module generator the new module is added automatically to the application as a dependency and a route for the new page.

```js
    dependencies.push('newpage');
    routes.push({'module': 'newpage'});
```

If you want to change the default route, templateUrl or controller name then you can use the following properties.
```js
    routes.push({
        'module': 'newpage',
        'path': '/newpage/:id',
        'templateUrl': '/modules/newpage/newpage.html.tpl',
        'controller': 'newpageController'
    });
```
