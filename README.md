# smart-localStorage

An HTML5 localStorage helper library that extends the native localStorage API through Javascript. It offers a more efficient and robust way of retrieving, setting and updating important information needed for your web application, with built-in callback support. This library also includes support for older browsers that don't natively support the localStorage API.


## SmartStorage constructor

Extends the `window.localStorage` API.

#### Constructor Methods

First, create a  new instance of the SmartStorage class

```js
var lstorage = new SmartStorage();
```

#### `SmartStorage.set(key, val, expiry)`

Extends the native `window.localStorage.setItem()` method allowing for object and array saving, plus returning the saved element.

```js
lstorage.set('animal', {type: 'dog'}, 60); // stores and returns {type: 'dog'} (that expires in 60 seconds)
```
You can chain methods
```js
lstorage.set('name', 'john', 60*60).get('name') // Returns 'john'
```

#### `SmartStorage.get(key)`

Extends the native `window.localStorage.getItem()` method allowing for object and array retrieving.

```js
lstorage.get('animal'); // returns {type: 'dog'}
```
or with a callback
```js
lstorage.get('animal', function(value) {
  return `My favorite animal is a ${value.type}`; // returns "My favorite animal is a dog"
});
```

#### `SmartStorage.setBulk(obj)`

Allows you to execute a bulk storage of key-value pairs in an object being passed in.

```js
var things = {
  color: "blue",
  language: "Javascript",
  groceries: { ketchup: 3.00, lettuce: 6.00 }
};

lstorage.setBulk(things); // equivalent to setting each local storage key to corresponding value individually
```
You can also chain the method
```js
lstorage.setBuik(things).get('animal') // returns {type: 'dog'}
```

#### `SmartStorage.isEmpty()`

Returns a true or false depending on if any key-value pairs are found in local storage.

```js
lstorage.set('name', 'john', 60*60);
lstorage.isEmpty(); // returns false

ls.clear(); // clears localStorage
ls.isEmpty(); // returns true
```
or with a callback
```js
lstorage.isEmpty(function(isEmpty) {
  return `LocalStorage is currently empty: ${isEmpty}`;
});
```

#### `SmartStorage.getKeys()`

Returns an array of keys found in `window.localStorage`.

```js
var things = {
  color: "blue",
  language: "Javascript",
  groceries: { ketchup: 3.00, lettuce: 6.00 }
};

lstorage.setBulk(things);

lstorage.getKeys(); // returns ['color', 'language', 'groceries'];
```

#### `SmartStorage.getAll()`

Returns an array of all values in `window.localStorage`.

```js
var things = {
  color: "blue",
  language: "Javascript",
  groceries: { ketchup: 3.00, lettuce: 6.00 }
};

lstorage.setBulk(things);

lstorage.getAll(); // returns ['blue', 'Javascript', { ketchup: 3.00, lettuce: 6.00 }];
```
or with a callback
```js
lstorage.getAll(function(result) {
  // Do something with the result
});
```

#### `SmartStorage.toObject()`

Returns an object representation of current `window.localStorage` key-value pairs.

```js
var things = {
  color: "blue",
  language: "Javascript",
  groceries: { ketchup: 3.00, lettuce: 6.00 }
};

lstorage.setBulk(things);

lstorage.toObject(); // { color: "blue", language: "Javascript", groceries: { ketchup: 3.00, lettuce: 6.00 }}
```
or with a callback
```js
lstorage.toObject(function(obj) {
  // use the data in how you want
  for (key in obj) {
    // loop through
  }
});
```

#### `SmartStorage.pushTo(key, item or array)`

Allows you to push data (Single item or Array) to an existing Array stored in localstorage

```js
lstorage.set('names', ['John', 'Jane'];
lstorage.pushTo('names', 'Joe');
lstorage.get('names') // Returns updated array ['John', 'Jane', 'Joe']
```

#### `SmartStorage.extend(key, mergeObj)`

Allows you to extend an existing object stored in localstorage 

```js
let extraInfo = {gender: 'M', eyeColor: 'brown'};

lstorage.set('person', {name: 'Tim', age: 25};
lstorage.extend('person', extraInfo);
lstorage.get('person') // Returns updated object {gender: 'M', eyeColor: 'brown', gender: 'M', eyeColor: 'brown'}
```

#### `SmartStorage.remove(key)`

Extends the native `window.localStorage.remove()` method allowing for deletion based on index number as well. Returns true if the key was found before deletion, false if not.

```js
lstorage.set('name', 'Joe');
lstorage.remove('name'); // removes 'name' item in localStorage
```

#### `SmartStorage.size()`

Returns the number of keys stored in `window.localStorage`.

```js
lstorage.set('name', 'Joe');
lstorage.size(); // 1
```

#### `SmartStorage.has(key)`

Returns either true or false depending on if the key exists.

or with a callback
```js
lstorage.has('someKey',function(exists) {
  return `This key exists: ${exists}`;
});
```

#### `SmartStorage.setProperty(key, property, value, expiry)`

Updates an existing localStorage Key if it exists by updating the property value provided and also updating the expiry. If the key does not exists then it creates a new `window.localStorage` key using the `SmartStorage.set()` method in our constructor.

```js
var car = {
  make: "Honda",
  model: "Accord"
};
  
lstorage.set('vehicle', car);
lstorage.setProperty('vehicle', 'model', 'civic', 3600); // updates the 'vehicle' key-value object from a model of Accord to Civic
```

#### `SmartStorage.clear()`

Extends the native `window.localStorage.clear()` method returning the total of items cleared.

## RequireJS

You can use this library with [RequireJS](http://requirejs.org/):

```javascript
define(['SmartStorage'], function(SmartStorage) {
    // As a callback:
    SmartStorage.setItem('mykey', 'myvalue', console.log);
});
```

## CommonJS


```javascript
var lstorage = require('./local_storage');
```

## Running Tests

Run unit tests powered by [Mocha](https://github.com/mochajs/mocha/) and [Chai](https://github.com/chaijs/chai/)


Since the `window.localStorage` API is meant to be run in the browser, run the test but opening up test/index.html in your browser and see the results.
