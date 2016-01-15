var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var lstorage = require('../local_storage');

describe('getting localstorage data', function() {
	it('should get data stored', function() {
		lstorage.set('tom', 'boy');
		var val = lstorage.get('tom');
		expect(val).to.equal('boy');
	})
})