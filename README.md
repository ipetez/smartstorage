# Javascript-localStorage-helper

An HTML5 localStorage helper library that extends the native localStorage API through Javascript. It offers a more efficient and robust way of retrieving, setting and updating important information needed for your web application. This library also includes built in error handling.

## Examples
```js
var lstorage = new StorageManager(); // creates new instance of the storageManager class 
console.log(lstorage.set('animal', 'dog', 60)); // 'dog' (that expires in 60 seconds)
console.log(lstorage.set('show', {title: 'Game of Thrones', seasons: 5}, 60*60*24)); // returns {title: 'Game of Thrones', seasons: 5} that expires in 24 hours
console.log(lstorage.size()); // 2
console.log(lstorage.has('animal')) // returns true
console.log(lstorage.get('show')); // {title: 'Game of Thrones', seasons: 5}
console.log(lstroage.getAll()); // ['dog, {title: 'Game of Thrones', seasons: 5}]
console.log(lstorage.remove('animal')); // true
console.log(lstorage.clear()); // 2 (number of items cleared)
```

## storageManager constructor

Extends the `window.localStorage` API.

#### Constructor Methods

#### `StorageManager.get(key)`

Extends the native `window.localStorage.getItem()` method allowing for object and array retrieving.

#### `StorageManager.set(key, val, expiry)`

Extends the native `window.localStorage.setItem()` method allowing for object and array saving, plus returning the saved element.

#### `StorageManager.setBulk(obj)`

Allows you to execute a bulk storage of key-value pairs in an object being passed in.

#### `StorageManager.isEmpty()`

Returns a true or false depending on if any key-value pairs are found in local storage.

#### `StorageManager.getKeys()`

Returns an array of keys found in `window.localStorage`.

#### `StorageManager.getAll()`

Returns an array of all values in `window.localStorage`.

#### `StorageManager.toObject()`

Returns an object representation of current `window.localStorage` key-value pairs.

#### `StorageManager.remove(key)`

Extends the native `window.localStorage.remove()` method allowing for deletion based on index number as well. Returns true if the key was found before deletion, false if not.

#### `StorageManager.size()`

Returns the number of keys stored in `window.localStorage`.

#### `StorageManager.has(key)`

Returns either true or false depending on if the key exists.

#### `StorageManager.setProperty(key, property, value, expiry)`

Updates an existing localStorage Key if it exists by updating the property value provided and also updating the expiry. If the key does not exists then it creates a new `window.localStorage` key using the `storageManager.set()` method in our constructor.

#### `StorageManager.clear()`

Extends the native `window.localStorage.clear()` method returning the total of items cleared.
