'use strict';

angular.module('geckoApp')
  .directive('treemap', ['TreemapDataService', '$rootScope', function (TreemapDataService, $rootScope) {
      var margin = {top: 40, right: 10, bottom: 10, left: 10},
              width = 920 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

      return {
        restrict: 'E',
        transclude: true,
        scope: {
          date: '='
        },
        link: function (scope, element, attrs) {
          var color = d3.scale.category20c();
  
          var treemap = d3.layout.treemap()
                                 .size([width, height])
                                 .sticky(true)
                                 .value(function(d) { return d.weight; });
  
          var div = d3.select(element[0]).append('div')
              .style('position', 'relative')
              .style('width', (width + margin.left + margin.right) + 'px')
              .style('height', (height + margin.top + margin.bottom) + 'px')
              .style('margin', '0 auto');
          
          TreemapDataService.onload(function (err, data) {
            if (err) console.error(err);
            var node = div.datum(data).selectAll('.node')
                .data(treemap.nodes)
                .enter().append('div')
                .attr('class', 'node')
                .call(position)
                .style('background', function(d) { return color(d.name); })
                .text(function(d) { return d.name; });
            
            scope.$watch(function () { 
                return scope.$parent.dateSelected;
              }, 
              function(newVal, oldVal) {
                if ( newVal !== oldVal ) {
                  var newDate = angular.isDate(newVal)? newVal.toISOString().substring(0, 10) 
                                                      : newVal;
                  // console.log('newDate:', newDate);
                  TreemapDataService.setDate(newDate, function (err, data) {
                    if (err) return console.error(err);
                    node/*.datum(data)*/
                        .data(treemap.nodes)
                        .transition()
                        .duration(1500)
                        .call(position);
                  });
                }
              }
            );
          });  
  
          function position() {
            this.style('left', function(d) { return d.x + 'px'; })
                .style('top', function(d) { return d.y + 'px'; })
                .style('width', function(d) { return Math.max(0, d.dx - 1) + 'px'; })
                .style('height', function(d) { return Math.max(0, d.dy - 1) + 'px'; });
          }
        }
      };
    }]);
