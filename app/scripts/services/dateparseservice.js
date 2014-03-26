'use strict';

angular.module('geckoApp')
  .service('dateParseService', function Dateparseservice() {
        var parse = function (dateVal) {
        	if (!dateVal) return;
            var year = dateVal.substring(0, 4),
                month = dateVal.substring(5, 7),
                day = dateVal.substring(8);
            var d = new Date ();
            d.setDate(day);
            d.setMonth(month);
            d.setFullYear(year);
            return new Date (Number (year), Number (month - 1), Number (day));
        };

        // convert year and month to date obj
        var miniParse = function (month, year) {
            return new Date (Number(year), Number(month - 1));
        };

        return {
            parse: parse,
            miniParse: miniParse
        };
  });
