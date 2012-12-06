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
			$.extend(true, this, {
				basicSerializedData: {
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
				},
				multiFormSerializedData: {
					form1: {
						'text1': {
							type: 'text',
							value: 'multi1'
						}
					},
					form2: {
						'text2': {
							type: 'text',
							value: 'multi2'
						}
					}, 
					conflict: {
						'text': {
							type: 'text',
							value: 'conflict'
						}
					}
				}
			});
		}
	});

	test('serialize basic fields', function(){
		var serialized = $('#serialize-ok').serializeObject();
		
		deepEqual(serialized, this.basicSerializedData, 'Text field serialization failed');
	});

	test('deserialize basic fields to clean form', function(){
		$('#deserialize-clean').deserializeObject(this.basicSerializedData);

		var serialized = $('#deserialize-clean').serializeObject();
		deepEqual(serialized, this.basicSerializedData, 'Clean deserialization failed');

		// TODO: test individual field values
	});

	test('deserialize basic fields to dirty form', function(){
		$('#deserialize-dirty').deserializeObject(this.basicSerializedData);

		var serialized = $('#deserialize-dirty').serializeObject();
		deepEqual(serialized, this.basicSerializedData, 'Dirty deserialization failed');

		// TODO: test individual field values
	});

	test('serialize multiple forms', function(){
		var serialized = $('#serialize-multi-1, #serialize-multi-2').serializeObject();

		deepEqual(serialized, 
			$.extend(true, {}, this.multiFormSerializedData.form1, this.multiFormSerializedData.form2), 
			'Multiple form serialization failed');

		// TODO: test individual field values
	});

	test('deserialize multiple forms', function(){
		var serialized = $.extend(true, {}, this.multiFormSerializedData.form1, this.multiFormSerializedData.form2);

		$('#serialize-multi-1, #serialize-multi-2').deserializeObject(serialized);

		var reserialized = {
			form1: $('#serialize-multi-1').serializeObject(),
			form2: $('#serialize-multi-2').serializeObject(),
			combined: $('#serialize-multi-1, #serialize-multi-2').serializeObject()
		};

		deepEqual(this.multiFormSerializedData.form1, reserialized.form1, 'Multiple form deserialization failed - form 1');
		deepEqual(this.multiFormSerializedData.form2, reserialized.form2, 'Multiple form deserialization failed - form 2');
		deepEqual(serialized, reserialized.combined, 'Multiple form deserialization failed - combined');
	});

})(jQuery);
