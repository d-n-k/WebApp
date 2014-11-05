// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
//
/**
 * Utils library
 */

var UTILS = (function () {

    return {
        /**
         * Check if a given value is a plain Object
         *
         * @param  {*}       o Any value to be checked
         * @return {Boolean}   true if it's an Object
         */
        isObject: function (o) {
            var toString = Object.prototype.toString;
            return (toString.call(o) === toString.call({}));
        },

        /**
         * AJAX helper function (similar to jQuery, but far from it!)
         *
         * @param {string} url     URL for the ajax request
         * @param {Object} options AJAX settings
         */
        ajax: function (url, options) {
            var xhr = new XMLHttpRequest(),
                method = 'GET',
                options = UTILS.isObject(options) ? options : {};

            // Check if "method" was supplied
            if (options.method) {
                method = options.method;
            }

            // Setup the request
            xhr.open(method.toUpperCase(), url);

            xhr.onreadystatechange = function () {
                var status;

                // If request finished
                if (xhr.readyState === 4) {
                    status = xhr.status;

                    // If response is OK or fetched from cache
                    if ((status >= 200 && status < 300) || status === 304) {
                        var res = xhr.responseText,
                            contentType = xhr.getResponseHeader('Content-Type');

                        // If server sent a content type header, handle formats
                        if (contentType) {
                            // Handle JSON format
                            if (contentType === 'text/json' ||
                                contentType === 'application/json') {

                                // JSON throws an exception on invalid JSON
                                try {
                                    res = JSON.parse(res);
                                } catch (err) {
                                    // Trigger "fail" callback if set
                                    if (options.fail) {
                                        options.fail.call(xhr, err);
                                        return;
                                    }
                                }
                            // Handle XML format
                            } else if (contentType === 'text/xml' ||
                                contentType === 'application/xml') {
                                // responseXML returns a document object
                                res = xhr.responseXML;

                                // if XML was invalid, trigger fail callback
                                if (res === null && options.fail) {
                                    options.fail.call(xhr, 'Bad XML file');
                                    return;
                                }
                            }
                        }

                        // Trigger done callback with the proper response
                        if (options.done) {
                            options.done.call(xhr, res);
                        }
                    }

                }
            };

            // Fire the request
            xhr.send(null);
        }
    };
}());
function(){
  // I test for features at the beginning of the declaration instead of everytime that we have to add an event.
  if(document.addEventListener) {
    window.addEvent = function (elem, type, handler, useCapture){
      elem.addEventListener(type, handler, !!useCapture);
      return handler; // for removal purposes
    }
    window.removeEvent = function (elem, type, handler, useCapture){
      elem.removeEventListener(type, handler, !!useCapture);
      return true;
    }
  }
  else if (document.attachEvent) {
    window.addEvent = function (elem, type, handler) {
      type = "on" + type;
      // Bounded the element as the context
      // Because the attachEvent uses the window object to add the event and we don't want to polute it.
      var boundedHandler = function() {
        return handler.apply(elem, arguments);
      };
      elem.attachEvent(type, boundedHandler);
      return boundedHandler; // for removal purposes
    }
    window.removeEvent = function(elem, type, handler){
      type = "on" + type;
      elem.detachEvent(type, handler);
      return true;
    }
  }
  else { // FALLBACK ( I did some test for both your code and mine, the tests are at the bottom. )
    // I removed wrapping from your implementation and added closures and memoization.
    // Browser don't support W3C or MSFT model, go on with traditional
    window.addEvent = function(elem, type, handler){
      type = "on" + type;
      // Applying some memoization to save multiple handlers
      elem.memoize = elem.memoize || {};
      // Just in case we haven't memoize the event type yet.
      // This code will be runned just one time.
      if(!elem.memoize[type]){
        elem.memoize[type] = { counter: 1 };
        elem[type] = function(){
          for(key in nameSpace){
            if(nameSpace.hasOwnProperty(key)){
              if(typeof nameSpace[key] == "function"){
                nameSpace[key].apply(this, arguments);
              };
            };
          };
        };
      };
      // Thanks to hoisting we can point to nameSpace variable above.
      // Thanks to closures we are going to be able to access its value when the event is triggered.
      // I used closures for the nameSpace because it improved 44% in performance in my laptop.
      var nameSpace = elem.memoize[type], id = nameSpace.counter++;
      nameSpace[id] = handler;
      // I return the id for us to be able to remove a specific function binded to the event.
      return id;
    };
    window.removeEvent = function(elem, type, handlerID){
      type = "on" + type;
      // I remove the handler with the id
      if(elem.memoize && elem.memoize[type] && elem.memoize[type][handlerID]) elem.memoize[type][handlerID] = undefined;
      return true;
    };

  };
})();
