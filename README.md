# Input Limits

Inputlimits is a jQuery plugin to limite the length of chatacters of entered by user in the textarea.

**Current version:** [0.2.0](https://github.com/nicolaszhao/inputlimits/archive/v0.2.0.tar.gz)

## Usage
Include jQuery and the plugin on your page. Then select a textarea and call the inputlimits method on DOM ready.

	<script src="jquery.js"></script>
	<script src="jquery.inputlimits.js"></script>
	<script>
		$(function() {
			$('.inputlimits-input').inputlimits();
		});
	</script>
	<textarea class="inputlimits-input" rows="6"></textarea>

## Options
**maxlength** (default: 10)   
Type: Number   
Maximum number of characters that can be entered.

***

**showRemainingChars** (default: true)   
Type: Boolean   
Whether the number of remaining characters can be entered to display.

***

**remainingCharsText** (default: '({0} characters remaining, up to {1} characters)')   
Type: String   
The text of the number of remaining characters. '{0}' indicate the remaining chars, '{1}' indicate the maxlength

## Methods
**option( options )**  
Returns: jQuery   
Set one or more options for the inputlimits.
	
* **options**   
	Type: Object   
	A map of option-value pairs to set.
	
**Code example:**
	
	$('textarea').inputlimits('option', {'maxlength': 20});
	
***

**refresh()**   
Returns: jQuery   
When the textarea value is set manually, need to call this method to manually update the related elements.

**Code example:**
	
	$('textarea').val('inputlimits').inputlimits('refresh');
	
## Callbacks
**change( limiter )**  
When the user enters text in a textarea or manually update the text and call `refresh()`, or update maxlength attribute, this method will automatically call. `this` refers to the current textarea element.

* **limiter**   
	Type: Object   
	* **value**   
		Type: String   
		The current text of the textarea.
		
	
**Code example:**
	
	$('textarea').inputlimits({
		change: function(limiter) {
			var $p = $(this).parent().find('.log');
			
			if (!$p.length) {
				$p = $('<p class="log" />').appendTo($(this).parent());
			}
			
			$p.text(limiter.value);
		}
	});
	
## Theming
If the remaining characters tip specific styling is needed, the following CSS class names can be used:
* `.inputlimits-helper`: The container of the remaining characters text.
 		
## Dependencies
### Required
[jQuery, tested with 1.10.2](http://jquery.com)

## License
Copyright (c) 2014 Nicolas Zhao; Licensed MIT