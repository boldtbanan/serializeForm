/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

	/*
		======== A Handy Little QUnit Reference ========
		http://docs.jquery.com/QUnit

		Test methods:
			expect(numAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			raises(block, [expected], [message])
	*/

	module('jQuery#serializeObject', {
		setup: function() {
			this.elems = $('#qunit-fixture').children();
		}
	});

	test('serialize basic fields', function(){
		var serialized = $('#serialize-ok').serializeObject();
		
		deepEqual(serialized, {
			'text': {
				type: 'text',
				value: 'Text field'
			},
			'textarea': {
				type: 'textarea',
				value: 'The quick brown fox jumps over the lazy dog.'
			},
			'hidden': {
				type: 'hidden',
				value: 'Hidden field'
			},
			'checkbox-single-selected': {
				type: 'checkbox',
				value: [
					'checkbox-single-selected-value'
				]
			},
			'checkbox-single-unselected': {
				type: 'checkbox',
				value: [
					'checkbox-single-unselected-value'
				]
			},
			'checkbox-set': {
				type: 'checkbox',
				value: [
					'checkbox-set-1-checked',
					'checkbox-set-2-checked'
				]
			},
			'radio-set': {
				type: 'radio',
				value: 'radio-set-2-checked'
			},
			'select-single': {
				type: 'select',
				value: 'single-select-option-2-selected'
			},
			'select-multiple': {
				type: 'select',
				value: [
					'multi-select-option-1-selected',
					'multi-select-option-3-selected'
				]
			}
		}, 'Text field serialization failed');
	});

})(jQuery);
