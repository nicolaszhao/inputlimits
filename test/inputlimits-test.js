( function($) {
	
	module('inputlimits: user actions');
	
	test('keydown: maximum input limit', function() {
		
		// default maxlength is 10
		var $input = $('.inputlimits-test-input'),
			text = '1234567890',
			event;
		
		$input.on('keydown', function(event) {
			if (!$.fn.inputlimits.utils.isDisabledInput(event, 10)) {
				$(this).val(text + String.fromCharCode(event.which));
			}
		});
		
		event = $.Event('keydown');
		event.which = 'a'.charCodeAt(0);
		$input.val(text).trigger(event);
		
		equal($input.val(), '1234567890', 'the value should not be changed');
	});
	
	test('keydown: the function keys are active when the length is maximum (such as: backspace, delete, down, right...)', function() {
		
		// default maxlength is 10
		var $input = $('.inputlimits-test-input'),
			text = '1234567890',
			event;
		
		$input.on('keydown', function(event) {
			if (!$.fn.inputlimits.utils.isDisabledInput(event, 10)) {
				$(this).val(text.substring(0, text.length - 1));
			}
		});
		
		event = $.Event('keydown');
		event.which = 8;
		$input.val(text).trigger(event);
		
		equal($input.val(), '123456789', 'the value should be backspace');
	});
	
	test('keydown: change the selected text when the length is maximum', function() {
		
		// default maxlength is 10
		var $input = $('.inputlimits-test-input'),
			text = '1234567890',
			event;
		
		$input.on('keydown', function(event) {
			if (!$.fn.inputlimits.utils.isDisabledInput(event, 10)) {
				$(this).val(String.fromCharCode(event.which));
			}
		});
		
		$input.val(text).get(0).select();
		event = $.Event('keydown');
		event.which = 'a'.charCodeAt(0);
		$input.trigger(event);
		
		equal($input.val(), 'a', 'the value should be changed');
	});
	
	module('inputlimits: options');
	
	test('maxlength', function() {
		var $input = $('.inputlimits-test-input').inputlimits();
		
		$input.val('1234567890123').inputlimits('refresh');
		equal($input.val(), '1234567890');
	});
	
	test('maxlength', function() {
		var $input = $('.inputlimits-test-input').inputlimits();
		
		equal($input.data('inputlimits-limiter').options.maxlength, 10);
	});
	
	test('showRemainingChars', function() {
		var $input = $('.inputlimits-test-input').inputlimits();
		
		equal($input.siblings('.inputlimits-helper').length, 1);
	});
	
	test('remainingCharsText', function() {
		var $input = $('.inputlimits-test-input').inputlimits();
		
		equal($input.siblings('.inputlimits-helper').text(), '(10 characters remaining, up to 10 characters)');
	});
	
	module('inputlimits: methods');
	
	test('option', function() {
		var $input = $('.inputlimits-test-input').inputlimits();
		
		$input.inputlimits('option', {
			maxlength: 20,
			showRemainingChars: false,
			remainingCharsText: '({0} / {1})'
		});
		
		equal($input.data('inputlimits-limiter').options.maxlength, 20, 'maxlength was changed');
		equal($input.siblings('.inputlimits-helper').length, 0, 'showRemainingChars was changed');
		
		$input.inputlimits('option', {
			showRemainingChars: true
		});
		equal($input.siblings('.inputlimits-helper').text(), '(20 / 20)', 'remainingCharsText was changed');
	});
	
	test('refresh', function() {
		var $input = $('.inputlimits-test-input').inputlimits({
			remainingCharsText: '({0} / {1})'
		});
		
		$input.val('123').inputlimits('refresh');
		equal($input.siblings('.inputlimits-helper').text(), '(7 / 10)');
	});
	
	module('inputlimits: callback');
	
	test('change', function() {
		var $input = $('.inputlimits-test-input'),
			text;
			
		$input.inputlimits({
			change: function(limiter) {
				text = limiter.value;
			}
		}).val('1234567890').inputlimits('refresh');
		
		equal(text, '1234567890');
	});
}(jQuery));
