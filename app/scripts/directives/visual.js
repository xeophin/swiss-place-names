'use strict';

/**
 * @ngdoc directive
 * @name swissnamesApp.directive:visual
 * @description
 * # visual
 */
angular.module('swissnamesApp')
  .directive('visual', visual);

function visual(suffixes, placeNames) {
  return {
    templateUrl: 'scripts/directives/visual.template.html',
    restrict: 'E',
    scope: {
      suffix: '=',
      chosenSuffix: '='
    },
    link: link
  };

  function link(scope, element, attrs) {
    scope.suffixList = [];
    scope.allPlacenames = [];

    var svg;

    // Scaling –> map LV95 coordinates to svg coordinates
    // East / North minimum and maximum
    var eMin = 2480750;
    var eMax = 2839000;
    var nMin = 1070625;
    var nMax = 1297374;

    // Define height and width //TODO
    var width = 1100,
      height = width / (eMax - eMin) * (nMax - nMin);

    var x = d3.scale.linear()
      // West-East Expanse of Switzerland in LV95
      .domain([eMin, eMax])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([nMin, nMax])
      .range([height, 0]);


    // Define color
    var color = d3.scale.linear()
      .domain([0, 5])
      .range(["lightyellow", "green"])
      .interpolate(d3.interpolateLab);

    var hexbin = d3.hexbin()
      .size([width, height])
      .radius(10)
      .x(function (d) {
        return x(d.E)
      })
      .y(function (d) {
        return y(d.N)
      });

    //Initialize Dropdown
    $('.ui.dropdown').dropdown({
      action: 'activate',
      onChange: function (value, text, $selectedItem) {
        console.log(value);
        drawPlaceNames(svg, value);
      }
    });

    suffixes.getSuffixes().then(suffixesLoaded);
    placeNames.getPlaceNames().then(placeNamesLoaded);


    function setupSvg() {
// Setup SVG
      var svg = d3.select('.d3.graph').append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('preserveAspectRatio', 'xMidYMid meet');

      svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("class", "mesh")
        .attr("width", width)
        .attr("height", height);
      return svg;
    }

    function createBackgroundGrid(svg) {
      // Create background shape of switzerland with all data points
      svg.append("g")
        .attr("clip-path", "url(#clip)")
        .selectAll(".backgroundhex")
        .data(hexbin(scope.allPlacenames))
        .enter().append("path")
        .attr("class", "backgroundhex")
        .attr("d", hexbin.hexagon())
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .style("fill", "lightyellow");

      return svg;
    }

    function placeNamesLoaded(data) {
      // Parse all placenames into an array
      scope.allPlacenames = d3.csv.parse(data);
      svg = setupSvg();
      svg = createBackgroundGrid(svg);
      $('.d3.graph').removeClass('loading');
    }

    function drawPlaceNames(svg, regex) {

      // Create selection of points that contain the suffix
      var reg = RegExp(regex);
      var points = scope.allPlacenames.filter(function (value, index) {
        return reg.test(value.namewithoutadditions);
      });

      // Delete previous hexbins
      d3.selectAll('.hexagon').remove();

      // Show selected

      svg.selectAll(".hexagon")
        .data(hexbin(points))
        .enter()
        .append("path")
        .attr("class", "hexagon")
        .attr("d", hexbin.hexagon())
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .style("fill", function (d) {
          return color(d.length);
        });

      return svg;
    }

    function suffixesLoaded(data) {
      scope.suffixList = angular.fromJson(data);
      $('.ui.dropdown').removeClass('loading');

    }

  }
}
