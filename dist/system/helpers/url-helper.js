"use strict";

System.register([], function (_export, _context) {
  var UrlHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("UrlHelper", UrlHelper = function () {
        function UrlHelper() {
          _classCallCheck(this, UrlHelper);
        }

        UrlHelper.objectToQuery = function objectToQuery(ar) {
          return encodeURIComponent(JSON.stringify(ar));
        };

        UrlHelper.queryToObject = function queryToObject(queryParam) {
          return JSON.parse(queryParam);
        };

        UrlHelper.getParameterByName = function getParameterByName(name, url) {
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        };

        return UrlHelper;
      }());

      _export("UrlHelper", UrlHelper);
    }
  };
});