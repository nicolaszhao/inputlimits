/*
 * inputlimits
 * https://github.com/nicolaszhao/inputlimits
 *
 * Copyright (c) 2013 Nicolas Zhao
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.inputlimits = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.inputlimits = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.inputlimits.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.inputlimits.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].inputlimits = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
