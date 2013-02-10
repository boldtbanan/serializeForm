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

	

	module('jQuery#serializeForm', {
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
				html5InputsSerializedData: {
					'tel-input': {
						type: 'tel',
						value: '555-555-5555'
					},
					'search-input': {
						type: 'search',
						value: 'search text'
					},
					'url-input': {
						type: 'url',
						value: 'http://www.google.com'
					},
					'email-input': {
						type: 'email',
						value: 'me@example.com'
					},
					'date-input': {
						type: 'date',
						value: '2013-01-01'
					},
					'time-input': {
						type: 'time',
						value: '15:04'
					},
					'number-input': {
						type: 'number',
						value: '24'
					},
					'range-input': {
						type: 'range',
						value: '42'
					},
					'color-input': {
						type: 'color',
						value: '#00ff00'
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
		var serialized = $('#serialize-basic').serializeForm();
		
		deepEqual(serialized, this.basicSerializedData, 'Text field serialization failed');
	});

	test('deserialize basic fields to clean form', function(){
		$('#deserialize-basic-clean').deserializeForm(this.basicSerializedData);

		var serialized = $('#deserialize-basic-clean').serializeForm();
		deepEqual(serialized, this.basicSerializedData, 'Clean deserialization failed');

		// TODO: test individual field values
	});

	test('deserialize basic fields to dirty form', function(){
		$('#deserialize-basic-dirty').deserializeForm(this.basicSerializedData);

		var serialized = $('#deserialize-basic-dirty').serializeForm();
		deepEqual(serialized, this.basicSerializedData, 'Dirty deserialization failed');

		// TODO: test individual field values
	});

	test('serialize html 5 input fields', function(){
		var serialized = $('#serialize-html5-inputs').serializeForm();
		
		deepEqual(serialized, this.html5InputsSerializedData, 'HTML 5 input field serialization failed');
	});

	test('deserialize html 5 fields to clean form', function(){
		$('#deserialize-html5-inputs-clean').deserializeForm(this.html5InputsSerializedData);

		var serialized = $('#deserialize-html5-inputs-clean').serializeForm();
		deepEqual(serialized, this.html5InputsSerializedData, 'Clean deserialization failed');

		// TODO: test individual field values
	});

	test('deserialize html 5 fields to dirty form', function(){
		$('#deserialize-html5-inputs-dirty').deserializeForm(this.html5InputsSerializedData);

		var serialized = $('#deserialize-html5-inputs-dirty').serializeForm();
		deepEqual(serialized, this.html5InputsSerializedData, 'Dirty deserialization failed');

		// TODO: test individual field values
	});

	test('serialize multiple forms', function(){
		var serialized = $('#serialize-multi-1, #serialize-multi-2').serializeForm();

		deepEqual(serialized, 
			$.extend(true, {}, this.multiFormSerializedData.form1, this.multiFormSerializedData.form2), 
			'Multiple form serialization failed');

		// TODO: test individual field values
	});

	test('deserialize multiple forms', function(){
		var serialized = $.extend(true, {}, this.multiFormSerializedData.form1, this.multiFormSerializedData.form2);

		$('#serialize-multi-1, #serialize-multi-2').deserializeForm(serialized);

		var reserialized = {
			form1: $('#serialize-multi-1').serializeForm(),
			form2: $('#serialize-multi-2').serializeForm(),
			combined: $('#serialize-multi-1, #serialize-multi-2').serializeForm()
		};

		deepEqual(this.multiFormSerializedData.form1, reserialized.form1, 'Multiple form deserialization failed - form 1');
		deepEqual(this.multiFormSerializedData.form2, reserialized.form2, 'Multiple form deserialization failed - form 2');
		deepEqual(serialized, reserialized.combined, 'Multiple form deserialization failed - combined');
	});

})(jQuery);
