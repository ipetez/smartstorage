/**
 * An HTML5 LocalStorage helper library. 
 * https://github.com/ipeters90/smart-localStorage
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
	var SmartStorage = function() {};

	/**
	* retrieve a localstorage key
	* @method get {value}
	* @param key
	* @param callback (optional)
	*/
	SmartStorage.prototype.get = function(key) {
		var item, callback = null;

    try {
    	item = JSON.parse(ls.getItem(key));
    } 
    catch(e) {
    	item = ls.getItem(key);
    }

    if (arguments.length === 1) {
    	return item; // return the key
    }
    else if (arguments.length === 2 && arguments[1] instanceof Function) {
    	callback = arguments[1];
    	callback(item);
    }
    else {
    	throw "Improper arguments";
    }
	};

	/**
	* Setting a key to localStorage
	* @method set {value} key
	* @param key
	* @param val
	* @param expiry
	* @param callback (optional)
	*/
	SmartStorage.prototype.set = function(key,val,expiry) {
		var savedEntry, callback = null;

		var expires = new Date().getTime()+(expiry*1000); // expiry in seconds
	  ls.setItem(key,JSON.stringify(val),expires);
	  savedEntry = this.get(key);

	  if (arguments.length === 4 && arguments[3] instanceof Function) {
	  	callback = arguments[3];
	  	callback(savedEntry);
	  }
	  else {
	  	return this;
	  }
	};

	/**
	* Removing a key from localStorage
	* @method remove
	* @param key
	* @param callback (optional)
	*/
	SmartStorage.prototype.remove = function(key) {
		var callback = null;

		if (arguments.length === 2 && arguments[1] instanceof Function) {
			callback = arguments[1];
		}

		try {
		  if (key in ls) {
		    ls.removeItem(key);
		    if (callback === null) {
		    	return key;
		    }
		    callback(key);
		  }
		}
		catch(e) {
			throw e;
		}
	};

	/**
	* Updating an existing key or create new if it doesn't exist
	* @method setProperty
	* @param key
	* @param property
	* @param value
	* @param expiry
	* @param callback (optional)
	*/
	SmartStorage.prototype.setProperty = function(key, property, value, expiry) {
		var item = this.get(key);
		var callback = null;
		var expires = new Date().getTime()+(expiry*1000);
		if (typeof item === 'object' && item !== null) {
			item[property] = value;
			ls.setItem(key, JSON.stringify(item), expires);
			return this;
		} 
		else if (item === undefined) { // create a new key if not found
			var newObject = {};
			newObject[property] = value;
			this.set(key, newObject, expires);
			return this;
		} 
		else {
			throw "Not an object"; // throw err when key is not an object
		}

		if (arguments.length === 5 && arguments[4] instanceof Function) {
			callback = arguments[4];
		}
		else if (arguments.length == 4 && arguments[3] instanceof Function) {
			callback = arguments[3];
		}
		else if (arguments.length < 3) {
			throw "Improper amount of arguments";
		}
		callback();
	};

	/**
	* Clears all localstorage items
	* @method clear
	* @param callback (optional)
	*/
  SmartStorage.prototype.clear = function() {
  	var callback = null;
	  var len = ls.length;
	  
	  ls.clear();

  	if (arguments.length === 1 && arguments[0] instanceof Function) {
  		callback = arguments[0];
  		callback(len);
  	}
  	else {
			return this;
  	}
  };

	/**
	* Display an array of all localstorage items
	* @method getAll
	* @param callback (optional)
	*/
  SmartStorage.prototype.getAll = function() {
  	var callback = null;
  	var allKeys = [];
		for ( var i = 0, len = ls.length; i < len; i++ ) {
		  allKeys.push( this.get( ls.key(i) ) );
		}
		var result =  allKeys.length ? allKeys : null;

  	if (arguments.length === 1 && arguments[0] instanceof Function) {
  		callback = arguments[0];
  		callback(result);
  	}
  	else {
			return result;
  	}
  };

	/**
	* Returns the number count of total keys
	* @method size
	* @param callback (optional)
	*/
  SmartStorage.prototype.size = function() {
  	var len = this.getAll().length;
  	var callback = null;

  	if (arguments.length === 1 && arguments[0] instanceof Function) {
  		callback = arguments[0];
  		callback(len);
  	}
  	else {
  		return len;
  	}
  };

	/**
	* Returns true or false if key is found or not
	* @method has
	* @param key
	* @param callback (optional)
	*/
  SmartStorage.prototype.has = function(key) {
  	var exists = this.get(key) !== null;
  	var callback = null;

  	if (arguments.length === 2 && arguments[1] instanceof Function) {
  		callback = arguments[1];
  		callback(exists);
  	}
  	else {
			return exists;
  	}

  };

	/**
	* Takes in an object and executes a bulk store of key-value pairs
	* @method setBulk
	* @param object
	* @param expiry
	* @param callback (optional)
	*/
  SmartStorage.prototype.setBulk = function(obj, exp) {
  	var callback = null;
  	var keys = Object.keys(obj),
  			len = keys.length,
  			i;

  	for (i = 0; i < len; i++) {
  		this.set(keys[i], obj[keys[i]], exp);
  	}

  	if (arguments.length === 3 && arguments[2] instanceof Function) {
  		callback = arguments[2];
  		callback();
  	}
  	else if (arguments.length === 2 && arguments[1] instanceof Function) {
  		callback = arguments[1];
  		callback();
  	}
  	else if (arguments.length < 1) {
  		throw "Improper amount of arguments";
  	}
  };

	/**
	* Returns true or false if localStorage is empty or not
	* @method isEmpty
	* @param callback (optional)
	*/
  SmartStorage.prototype.isEmpty = function() {
  	var isEmpty = this.size() === 0;
  	var callback = null;

  	if (arguments.length === 1 && arguments[0] instanceof Function) {
  		callback = arguments[0];
  		callback(isEmpty);
  	}
  	else {
			return isEmpty;
  	}
  };

	/**
	* Returns an array of all localStorage keys
	* @method getKeys
	* @param callback (optional)
	*/
  SmartStorage.prototype.getKeys = function() {
  	var result = [], len = ls.length, i, callback = null;

  	for (i = 0; i < len; i++) {
  		result.push(ls.key(i));
  	}

  	if (arguments.length === 1 && arguments[0] instanceof Function) {
  		callback = arguments[0];
  		callback(result);
  	}
  	else {
			return result;
  	}
  };

	/**
	* Returns an object representation of current window.localStorage key-value pairs.
	* @method toObject
	* @param callback (optional)
	*/
  SmartStorage.prototype.toObject = function() {
    var obj = {},
				keys = this.getKeys(),
				len = keys.length,
				i,
				callback = null;

    for (i = 0; i < len; i++) {
      obj[keys[i]] = this.get(keys[i]);
    }

  	if (arguments.length === 1 && arguments[0] instanceof Function) {
  		callback = arguments[0];
  		callback(obj);
  	}
  	else {
			return obj;
  	}
  };

	/**
	* Allows you to push to an array stored in localstorage.
	* @method pushTo
	* @param arr (the localstorage key to look up array)
	* @param item (item or array we're pushing to stored array)
	*/
  SmartStorage.prototype.pushTo = function(arr, item) {
  	var newArr;
  	try {
  		newArr = JSON.parse(this.get(arr));
  	}
  	catch(e) {
  		newArr = this.get(arr);
  	}
  	if (Array.isArray(item)) {
  		newArr = newArr.concat(item);
  	}
  	else if (typeof item === "string") {
  		newArr.push(item);
  	}
  	this.set(arr, newArr);
  	return this;
  };

	/**
	* Allows you to extend a stored object in localstorage.
	* @method extend
	* @param baseObj (key to look up stored object)
	* @param mergeObj (object being merged into baseObj)
	*/
	SmartStorage.prototype.extend = function(baseObj, mergeObj) {
		var newObj;
		try {
			newObj = JSON.parse(this.get(baseObj));
		}
		catch(e) {
			newObj = this.get(baseObj);
		}
		var keys = Object.keys(mergeObj);

		for (var i = 0, len = keys.length; i < len; i++) {
			newObj[keys[i]] = mergeObj[keys[i]];
		}
		this.set(baseObj, newObj);
		return this;
	};

	// AMD, CommonJS and global support
	if (typeof define === 'function' && define.amd) {
	  define(function () {
	     return SmartStorage;
	  });
	} 
	else if (typeof exports !== 'undefined') {
	  module.exports = SmartStorage;
	} 
	else {
		if (!window.SmartStorage) {
			window.SmartStorage = SmartStorage;
		};
	};

})(window);