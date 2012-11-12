/*! Serializeobject - v0.1.0 - 2012-11-10
* https://github.com/boldtbanan/serializeobject
* Copyright (c) 2012 Ian Garrison; Licensed MIT */

(function($) {
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
          if (existing.value !== null ) { throw 'multiple radio selects'; }

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
          //name: element.attr('name'),
          type: 'checkbox',
          value: element.is(':checked') ? [element.val()] : []
        };
      },
      ':radio': function (element) {
        return {
          //name: element.attr('name'),
          type: 'radio',
          value: element.is(':checked') ? element.val() : null
        };
      },
      'textarea': function (element) {
        return {
          //name: element.attr('name'),
          type: 'textarea',
          value: element.val()
        };
      },
      'select': function (element) {
        return {
          //name: element.attr('name'),
          type: 'select',
          value: element.val()
        };
      },
      '*': function (element) {
        return {
          //name: element.attr('name'),
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
      checkbox: function (field) {
        $('input:checkbox[name="' + field.name + '"]', form).each(function (i, cb) {
          cb.checked = (field.value.indexOf(cb.value) !== -1);
        });
      },
      radio: function (field) {
        $('input:radio[name="' + field.name + '"]', form).each(function (i, rb) {
          rb.checked = (field.value === rb.value);
        });
      },
      'default': function (field) {
        $('input[name="' + field.name + '"], textarea[name="' + field.name + '"], select[name="' + field.name + '"]', form).val(field.value);
      }
    };

    $.each(serializedObject, function (i, o) {
      var map = mapper[o.type] || mapper['default'];
      map.call(this, o);
    });
  };

}(jQuery));
