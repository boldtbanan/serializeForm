/*
 * serializeObject
 * https://github.com/boldtbanan/serializeobject
 *
 * Copyright (c) 2012 Ian Garrison
 * Licensed under the MIT license.
 */

(function ($) {
  $.fn.serializeObject = function () {
    return (this.length === 0) ? [] : $.serializeObject(this.eq(0));
  };

  $.serializeObject = function (element) {
    var serialized = {};

    var map = function (field) {
      for (var i in mapper) {
        if (field.is(i)) {
          return mapper[i].call(this, field);
        }
      }

      // should never get here
      return null;
    };

    var append = function (field, fieldName) {
      var existing = serialized[fieldName];

      if (existing) {
        if (existing.type !== field.type) { throw 'type mismatch: ' + existing.type + ' and ' + field.type; }

        if (field.type === 'checkbox') {
          existing.value = existing.value.concat(field.value);
        } else if (field.type === 'radio') {
          if (field.value === null) { return; }
          if (existing.value !== null) { throw 'multiple radio selects'; }

          existing.value = field.value;
        } else {
          throw 'duplicate field detected';
        }
      } else {
        serialized[fieldName] = field;
      }
    };

    var mapper = {
      ':checkbox': function (element) {
        return {
          type: 'checkbox',
          value: element.is(':checked') ? [element.val()] : []
        };
      },
      ':radio': function (element) {
        return {
          type: 'radio',
          value: element.is(':checked') ? element.val() : null
        };
      },
      'textarea': function (element) {
        return {
          type: 'textarea',
          value: element.val()
        };
      },
      'select': function (element) {
        return {
          type: 'select',
          value: element.val()
        };
      },
      '*': function (element) {
        return {
          type: element.attr('type'),
          value: element.val()
        };
      }
    };

    $('input[name][type!=submit], textarea[name], select[name]', element).each(function () {
      var $elem = $(this);
      append(map($elem), $elem.attr('name'));
    });

    return serialized;
  };

  $.fn.deserializeObject = function (serializedObject) {
    return this.each(function () {
      $.deserializeObject(this, serializedObject);
    });
  };

  $.deserializeObject = function (form, serializedObject) {
    var mapper = {
      checkbox: function (fieldName, field) {
        $('input:checkbox[name="' + fieldName + '"]', form).each(function (i, cb) {
          cb.checked = (field.value.indexOf(cb.value) !== -1);
        });
      },
      radio: function (fieldName, field) {
        $('input:radio[name="' + fieldName + '"]', form).each(function (i, rb) {
          rb.checked = (field.value === rb.value);
        });
      },
      'default': function (fieldName, field) {
        $('input[name="' + fieldName + '"], textarea[name="' + fieldName + '"], select[name="' + fieldName + '"]', form).val(field.value);
      }
    };

    $.each(serializedObject, function (i, o) {
      var map = mapper[o.type] || mapper['default'];
      map.call(this, i, o);
    });
  };

} (jQuery));