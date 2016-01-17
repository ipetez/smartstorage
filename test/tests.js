var expect = chai.expect;
var lstorage = new SmartStorage();

describe('set() and get()', function() {
	it('should get data stored', function() {
		lstorage.set('car', 'Honda');
		var result = lstorage.get('car');
		expect(result).to.equal('Honda');
		lstorage.clear();
	})

	it('should be an object', function() {
		lstorage.set('person', {name: 'John', age: 25});
		var result = lstorage.get('person');
		expect(result).to.be.an('object');
		lstorage.clear();
	})
});

describe('remove()', function() {
	it('should remove target stored data', function() {
		lstorage.set('dog', 'Doberman');
		expect(lstorage.get('dog')).to.equal('Doberman');

		lstorage.remove('dog');
		expect(lstorage.get('dog')).to.equal(null);
		lstorage.clear()
	})
});

describe('setProperty()', function() {
	it('should add property to object', function() {
		lstorage.set('person', {name: 'John', age: 25});
		lstorage.setProperty('person', 'eyeColor', 'brown');

		var result = lstorage.get('person')['eyeColor'];
		expect(result).to.equal('brown');
		lstorage.clear();
	})
});

describe('getAll()', function() {
	// TODO
});

describe('size()', function() {
	it('should return 0 when localstorage is empty', function() {
		expect(lstorage.size()).to.equal(0);
	})

	it('should return 2 when storing first 2 items in localstorage', function() {
		lstorage.set('game', 'BlackOps');
		lstorage.set('language', 'JavaScript');
		expect(lstorage.size()).to.equal(2);
		lstorage.clear();
	})
});

describe('has() which checks for key and returns a boolean', function() {
	it('should return false since key doesn\'t exist', function() {
		var result = lstorage.has('city');
		expect(result).to.equal(false);
	})

	it('should return true when first adding target key', function() {
		lstorage.set('city', 'San Francisco');
		var result = lstorage.has('city');
		expect(result).to.equal(true);
		lstorage.clear();
	})
});

describe('setBulk()', function() {
	it('should store each key-val pair as separate items in storage', function() {
		lstorage.setBulk({
			pet: 'dog',
			sport: 'Basketball'
		});
		//TODO
	})
});

describe('isEmpty()', function() {
	it('should return true when no items are stored', function() {
		lstorage.clear();
		var result = lstorage.isEmpty();
		expect(result).to.equal(true);
	})

	it('should return false when items are stored', function() {
		lstorage.set('laptop', 'MacBook Pro');
		var result = lstorage.isEmpty();
		expect(result).to.equal(false);
		lstorage.clear();
	})
});

describe('getKeys()', function() {
	it('should return keys in an array', function() {
		lstorage.setBulk({
			pet: 'dog',
			sport: 'Basketball'
		});

		var result = lstorage.getKeys();
		expect(result).to.be.an('array');
		lstorage.clear();
	})
});

describe('toObject()', function() {
	it('should return object of all localstorage key-val items stored', function() {
		lstorage.set('name', 'John');
		lstorage.set('city', 'Los Angeles');

		var result = lstorage.toObject();
		expect(result).to.be.an('object');
		lstorage.clear();
	})
});

describe('pushTo()', function() {
	it('array should have a length of 2', function() {
		lstorage.set('meals', ['Pasta', 'Sandwich']);
		var len = lstorage.get('meals').length;
		expect(len).to.equal(2);
	})
	it('length should increase to 4 after adding 2 more items to array', function() {
		lstorage.pushTo('meals', ['Burger', 'Salad']);
		var len = lstorage.get('meals').length;
		expect(len).to.equal(4);
		lstorage.clear();
	})
});

describe('extend()', function() {
	it('should extend stored object', function() {
		//TODO
	})
});