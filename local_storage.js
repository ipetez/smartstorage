/**
 * An HTML5 LocalStorage helper library. 
 * https://github.com/ipeters90/javascript-localstorage-helper/
 * 
 * @author Ike Peters
 */

(function(window) {
	'use strict';

  // Inital check to see if localStorage is supported in the browser
  (function() {
    var supported;

    // Attempting to save item in localstorage to check for support
    try {
      localStorage.setItem('testing', 'testing value');
      localStorage.removeItem('testing');
      supported = true;
    } catch(e) {
      supported = false;
    }

    // Polyfill in case localstorage is not supported
    // From https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Storage?redirectlocale=en-US&redirectslug=DOM%2FStorage
    if(!supported) {
      window.localStorage = {
        getItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
          return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
            "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },

        key: function (nKeyId) {
          return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },

        setItem: function (sKey, sValue) {
          if(!sKey) { return; }
          document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
          this.length = document.cookie.match(/\=/g).length;
        },

        length: 0,

        removeItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return; }
          document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          this.length--;
        },

        hasOwnProperty: function (sKey) {
          return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
      };

      window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
    }
  })();

  var ls = window.localStorage;

	/**
	* Storage manager function constructor
	* @contstructor
	*/
	var StorageManager = function() {};

	/**
	* retrieve a localstorage key
	* @method get {value}
	* @param key
	*/
	StorageManager.prototype.get = function(key) {
		var item;
    try {
    	item = JSON.parse(ls.getItem(key))
    } 
    catch(e) {
    	item = ls.getItem(key)
    }
    return item; // return the key
	};

	/**
	* Setting a key to localStorage
	* @method set {value} key
	* @param key
	* @param val
	* @param expiry
	*/
	StorageManager.prototype.set = function(key,val,expiry) {
		var expires = new Date().getTime()+(expiry*1000); // expiry in seconds
	  ls.setItem(key,JSON.stringify(val),expires);
	  return this.get(key);
	};

	/**
	* Removing a key from localStorage
	* @method remove
	* @param key
	*/
	StorageManager.prototype.remove = function(key) {
	  if (key in ls) {
	    ls.removeItem(key);
	  }
	  var removedStorage = this.get(key);
	  return removedStorage === undefined || removedStorage === null;
	};

	/**
	* Updating an existing key or create new if it doesn't exist
	* @method setProperty
	* @param key
	* @param property
	* @param value
	* @param expiry
	*/
	StorageManager.prototype.setProperty = function(key, property, value, expiry) {
		var item = this.get(key);
		var expires = new Date().getTime()+(expiry*1000);
		if (typeof item === 'object' && item !== null) {
			item[property] = value;
			ls.setItem(key, JSON.stringify(item), expires);
		} else if (item === undefined) { // create a new key if not found
			var newObject = {};
			newObject[property] = value;
			this.set(key, newObject, expires);
		} else {
			throw "Not an object"; // throw err when key is not an object
		}
	};

	/**
	* Clears all localstorage items
	* @method clear
	*/
  StorageManager.prototype.clear = function() {
	  var len = ls.length;
	  ls.clear();
	  return len;
  };

	/**
	* Display an array of all localstorage items
	* @method getAll
	*/
  StorageManager.prototype.getAll = function() {
  	var allKeys = [];
		for ( var i = 0, len = ls.length; i < len; i++ ) {
		  allKeys.push( this.get( ls.key(i) ) );
		}
		return allKeys.length ? allKeys : null;
  };

	/**
	* Returns the number count of total keys
	* @method size
	*/
  StorageManager.prototype.size = function() {
  	return this.getAll().length;
  }

	/**
	* Returns true or false if key is found or not
	* @method has
	* @param key
	*/
  StorageManager.prototype.has = function(key) {
  	return this.get(key) !== null;
  }

	/**
	* Takes in an object and executes a bulk store of key-value pairs
	* @method setBulk
	* @param object
	* @param expiry
	*/
  StorageManager.prototype.setBulk = function(obj, exp) {
  	var keys = Object.keys(obj),
  			len = keys.length,
  			i;

  	for (i = 0; i < len; i++) {
  		this.set(keys[i], obj[keys[i]], exp);
  	}
  }

	/**
	* Returns true or false if localStorage is empty or not
	* @method isEmpty
	*/
  StorageManager.prototype.isEmpty = function() {
  	return this.size() === 0;
  }

	/**
	* Returns an array of all localStorage keys
	* @method getKeys
	*/
  StorageManager.prototype.getKeys = function() {
  	var result = [], len = ls.length, i;

  	for (i = 0; i < len; i++) {
  		result.push(ls.key(i));
  	}
  	return result;
  }

	/**
	* Returns an object representation of current window.localStorage key-value pairs.
	* @method toObject
	*/
  StorageManager.prototype.toObject = function() {
    var obj = {},
				keys = this.getKeys(),
				len = keys.length,
				i;

    for (i = 0; i < len; i++) {
      obj[keys[i]] = this.get(keys[i]);
    }

    return obj;
  }

	// Assign our storageManager object to global window object.
  if (!window.StorageManager) {
  	window.StorageManager = StorageManager;
  }

})(window);