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
		
		equal($input.val(), '1234567890', 'the value has not changed');
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
		
		equal($input.val(), '123456789', 'the value can backspace');
	});
	
}(jQuery));
