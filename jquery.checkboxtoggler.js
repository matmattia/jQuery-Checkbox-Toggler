/**
* jQuery Checkbox Toggler
* @name jquery.checkboxtoggler.js
* @author Mattia - http://www.matriz.it
* @version 1.1.0
* @date December 30, 2022
* @category jQuery plugin
* @copyright (c) 2022 Mattia at Matriz.it (info@matriz.it)
* @license MIT - https://opensource.org/licenses/mit-license.php
* @example Visit https://www.matriz.it/projects/jquery-checkbox-toggler/ for more informations about this jQuery plugin
*/
(function ($) {
	var checkbox_toggler = {
		'init': function(t, options) {
			c = this.getCheckboxes(options), l = c.length, i = 0;
			for (i = 0; i < l; i++) {
				$(c[i]).change(function() {
					checkbox_toggler.checkAll(t, options);
				});
			}
			this.checkAll(t, options);
			$(t).change(function() {
				checkbox_toggler.toggle(this, $(this).is(':checked'), options);
			});
		},
		'getCheckboxes': function(options) {
			return $(options.checkboxes);
		},
		'checkAll': function(t, options) {
			var c = this.getCheckboxes(options), l = c.length, i = 0, all_c = false;
			if (l > 0) {
				all_c = true;
				for (i = 0; i < l; i++) {
					if (!$(c[i]).is(':checked')) {
						all_c = false;
						break;
					}
				}
			}
			$(t).prop('checked', all_c);
			if ($.isFunction(options.onChange)) {
				options.onChange.call(t, l, c.filter(':checked').length);
			}
		},
		'toggle': function(t, s, options) {
			var c = this.getCheckboxes(options);
			$(t).prop('checked', !!s);
			if (c.length > 0) {
				c.prop('checked', !!s);
			}
			if ($.isFunction(options.onChange)) {
				options.onChange.call(t, c.length, c.filter(':checked').length);
			}
		}
	};
	
	$.fn.checkboxToggler = function(options) {
		var opts = $.extend({
			'checkboxes': 'input[type=checkbox]',
			'onChange': null
		}, options);

		return this.each(function() {
			checkbox_toggler.init(this, opts);
		});
	};
})(jQuery);