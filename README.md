# Javascript-localStorage-helper

An HTML5 localStorage helper library that extends the native localStorage API through Javascript. It offers a more efficient and robust way of retrieving, setting and updating important information needed for your web application. This library also includes built in error handling.


## storageManager constructor

Extends the `window.localStorage` API.

#### Constructor Methods

First, create a  new instance of the StorageManager class

```js
var lstorage = new StorageManager();
```

#### `StorageManager.set(key, val, expiry)`

Extends the native `window.localStorage.setItem()` method allowing for object and array saving, plus returning the saved element.

```js
lstorage.set('animal', {type: 'Dog'}, 60); // stores and returns {type: 'Dog'} (that expires in 60 seconds)
```

#### `StorageManager.get(key)`

Extends the native `window.localStorage.getItem()` method allowing for object and array retrieving.

```js
lstorage.get('animal'); // returns {type: 'Dog'}
```

#### `StorageManager.setBulk(obj)`

Allows you to execute a bulk storage of key-value pairs in an object being passed in.

```js
var things = {
  color: "blue",
  language: "Javascript",
  groceries: { ketchup: 3.00, lettuce: 6.00 }
};

lstorage.setBulk(things); // equivalent to setting each local storage key to corresponding value individually
```

#### `StorageManager.isEmpty()`

Returns a true or false depending on if any key-value pairs are found in local storage.

```js
lstorage.set('name', 'john', 60*60);
lstorage.isEmpty(); // returns false

ls.clear(); // clears localStorage
ls.isEmpty(); // returns true
```

#### `StorageManager.getKeys()`

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

#### `StorageManager.getAll()`

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

#### `StorageManager.toObject()`

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

#### `StorageManager.remove(key)`

Extends the native `window.localStorage.remove()` method allowing for deletion based on index number as well. Returns true if the key was found before deletion, false if not.

```js
lstorage.set('name', 'Joe');
lstorage.remove('name'); // removes 'name' item in localStorage
```

#### `StorageManager.size()`

Returns the number of keys stored in `window.localStorage`.

```js
lstorage.set('name', 'Joe');
lstorage.size(); // 1
```

#### `StorageManager.has(key)`

Returns either true or false depending on if the key exists.

#### `StorageManager.setProperty(key, property, value, expiry)`

Updates an existing localStorage Key if it exists by updating the property value provided and also updating the expiry. If the key does not exists then it creates a new `window.localStorage` key using the `storageManager.set()` method in our constructor.

```js
var car = {
  make: "Honda",
  model: "Accord"
};
  
lstorage.set('vehicle', car);
lstorage.setProperty('vehicle', 'model', 'civic', 3600); // updates the 'vehicle' key-value object from a model of Accord to Civic
```

#### `StorageManager.clear()`

Extends the native `window.localStorage.clear()` method returning the total of items cleared.
