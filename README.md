# Javascript-localStorage-helper

An HTML5 localStorage helper library that extends the native localStorage API through Javascript. It offers a more efficient and robust way of retrieving, setting and updating important information needed for your web application. This library also includes built in error handling.

## Examples
```js
var lstorage = new storageManager(); // creates new instance of the storageManager class 
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

#### `storageManager.get(key)`

Extends the native `window.localStorage.getItem()` method allowing for object and array retrieving.

#### `storageManager.set(key, val, expiry)`

Extends the native `window.localStorage.setItem()` method allowing for object and array saving, plus returning the saved element.

#### `storageManager.remove(key)`

Extends the native `window.localStorage.remove()` method allowing for deletion based on index number as well. Returns true if the key was found before deletion, false if not.

#### `storageManager.size()`

Returns the number of keys stored in `window.localStorage`.

#### `storageManager.has(key)`

Returns either true or false depending on if the key exists.

#### `storageManager.setProperty(key, property, value, expiry)`

Updates an existing localStorage Key if it exists by updating the property value provided and also updating the expiry. If the key does not exists then it creates a new `window.localStorage` key using the `storageManager.set()` method in our constructor.

#### `storageManager.getAll()`

Returns an array of of all `window.localStorage` items.

#### `storageManager.clear()`

Extends the native `window.localStorage.clear()` method returning the total of items cleared.
