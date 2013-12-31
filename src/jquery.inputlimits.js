/*
 * inputlimits
 * https://github.com/nicolaszhao/inputlimits
 *
 * Copyright (c) 2013 Nicolas Zhao
 * Licensed under the MIT license.
 */

(function($) {
	
	$.fn.inputlimits = function(options) {
		var args = Array.prototype.slice.call(arguments, 1);
		
		if (typeof options === 'string') {
			this.each(function() {
				var instance = $(this).data('inputlimits-limiter');
				
				if (instance && $.type(instance[options]) === 'function' && options !== 'create') {
					instance[options].apply(instance, args);
				}
			});
		} else {
			options = $.extend({}, $.fn.inputlimits.defaults, options);
			
			this.each(function() {
				var $element = $(this),
					instance = $element.data('inputlimits-limiter'),
					limiter;
				
				if (instance) {
					instance.option(options);
				} else {
					limiter = $.extend({}, $.fn.inputlimits.limiter);
					$element.data('inputlimits-limiter', limiter);
					limiter.create($element, options);
				}
			});
		}
		
		return this;
	};
	
	$.fn.inputlimits.defaults = {
		maxlength: 10,
		showRemainingChars: true,
		
		// {0}: remaining chars number
		remainingCharsText: '({0} characters remaining)',
		
		// callback
		change: null
	};
	
	$.fn.inputlimits.limiter = {
		create: function($element, options) {
			var that = this;
			
			this.$element = $element;
			this.options = $.extend({}, options);
			
			this.$element.on({
				keydown: function(event) {
					var hasSelection = document.selection ? 
								document.selection.createRange().text.length > 0 : 
								this.selectionStart != this.selectionEnd;
								
					if ($.fn.inputlimits.utils.isDisabledInput(event, that.options.maxlength)) {
						event.preventDefault();
					}
					
					if (that.options.showRemainingChars) {
						setTimeout(function() {
							that.refresh();
						}, 200);
					}
				},
				
				keyup: function() {
					var maxlength = that.options.maxlength;
					
					if (this.value.length > maxlength) {
						this.value = this.value.substring(0, maxlength);
					}
				}
			});
			
			this._refresh();
		},
		
		option: function(options) {
			this.options = $.extend(this.options, options);
			this._refresh();
		},
		
		refresh: function() {
			var callback = this.options.change;
			
			if (this.$helper) {
				this.$helper.html(this._getRemainingCharsText());
			}
			
			if ($.type(callback) === 'function') {
				callback.call(this.$element, {
					text: this.$element.val()
				});
			}
		},
		
		_refresh: function() {
			var maxlength = this.options.maxlength,
				text = this.$element.val();
			
			if (this.options.showRemainingChars) {
				if (!this.$helper) {
					this.$helper = this._helper();
				}
			} else {
				if (this.$helper) {
					this.$helper.remove();
					this.$helper = null;
				}
			}
			
			if (text.length > maxlength) {
				this.$element.val(text.substring(0, maxlength));
			}
			
			if (this.$helper) {
				this.$helper.html(this._getRemainingCharsText());
			}
		},
		
		_helper: function() {
			return $('<div class="inputlimits-helper" />').insertAfter(this.$element);
		},
		
		_getRemainingCharsText: function() {
			return this.options.remainingCharsText.replace('{0}', this.options.maxlength - this.$element.val().length);
		}
	};
	
	$.fn.inputlimits.utils = {
		
		keyCode: {
			BACKSPACE: 8,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			RIGHT: 39,
			UP: 38
		},
		
		isFunctionKey: function(which) {
			var ret = false;
			
			$.each(this.keyCode, function(key, code) {
				if (which === code) {
					ret = true;
					return false;
				}
			});
			
			return ret;
		},
		
		isDisabledInput: function(event, maxlength) {
			var element = event.target,
				hasSelection = document.selection ? 
						document.selection.createRange().text.length > 0 : 
						element.selectionStart != element.selectionEnd;
						
			if (element.value.length >= maxlength && 
						!this.isFunctionKey(event.which) && 
						!event.ctrlKey && !event.altKey && !hasSelection) {
							
				return true;
			}
			
			return false;
		}
	};
	
}(jQuery));