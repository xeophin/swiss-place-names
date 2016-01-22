(function ($, d3, angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name swissnamesApp.directive:visual
   * @description
   * # visual
   */
  angular.module('swissnamesApp')
    .directive('visual', visual);

  function visual() {
    return {
      templateUrl: 'views/visual.template.html',
      restrict: 'E',
      scope: {
        suffixes: '=suffixes',
        places: '=places',
        class: '@',
        comment: '@'
      },
      link: link
    };

    function link(scope, element, attrs) {

      // Setup attributes
      scope.title = attrs.displayTitle || false;
      scope.showSelfService = attrs.showSelfService || false;
      scope.showLegend = attrs.showLegend || false;
      scope.subhead = attrs.subhead || false;
      scope.showPopup = attrs.showPopup || false;
      scope.chosenSuffix = attrs.searchString || '';

      scope.drawBackgroundGrid = drawBackgroundGrid;
      scope.drawCities = drawCities;
      scope.drawLegend = drawLegend;
      scope.drawPlaceNames = drawPlaceNames;
      scope.setupVisualisation = setupVisualisation;
      scope.updateMap = updateMap;

      /**
       * Identifier of the visualisation, used to select the right object
       * when drawing/updating the visualisation.
       * @type {string}
       */
      var identifier = '.' + attrs.class;

      var hexbinSize = attrs.hexbinSize || 10;


      // Private properties

      /**
       * Reference to the SVG node
       */
      scope.svg;

      /**
       * Collection of Names that will be displayed on the city layer
       * @type {Array}
       */
      var bigCityNames = [
        'Zürich',
        'Basel',
        'Bern',
        'St. Gallen',
        'St. Moritz',
        'Neuchâtel',
        'Interlaken',
        'Luzern',
        'Olten',
        'Lausanne',
        'Genève',
        'Lugano',
        'Davos Dorf',
        'Schaffhausen',
        'Sion',
        'Visp',
        'Glarus',
        'Locarno'
      ];

      /**
       * Contains the completed city list including their coordinates.
       * @type {Array}
       */
      var bigCities = [];

      // Scaling –> map LV95 coordinates to svg coordinates
      // East / North minimum and maximum
      var eMin = 2480750;
      var eMax = 2839000;
      var nMin = 1070625;
      var nMax = 1297374;

      /**
       * Width and height of the map. Side ratio is based on the coordinate
       * maxima and minima above.
       * @type {number}
       */
      var width = 1100,
        height = width / (eMax - eMin) * (nMax - nMin);

      var x = d3.scale.linear()
        // West-East Expanse of Switzerland in LV95
        .domain([eMin, eMax])
        .range([0, width]);

      var y = d3.scale.linear()
        .domain([nMin, nMax])
        .range([height, 0]);


      /**
       * Colors used in the graphic.
       * @type {string}
       */
      var backgroundColor = '#cce4ed',
        foregroundColor = '#9b2979',
        cityMarkerColor = 'steelblue';

      /**
       * Color Scale
       */
      var color = d3.scale.linear()
        .domain([0, hexbinSize])
        .range([backgroundColor, foregroundColor])
        .interpolate(d3.interpolateLab);

      /**
       * Hexbin object used for creating the map.
       */
      var hexbin = d3.hexbin()
        .size([width, height])
        .radius(hexbinSize)
        .x(function (d) {
          return x(d.E)
        })
        .y(function (d) {
          return y(d.N)
        });

      activate();

      //////////////////////////////
      /**
       * Creates the background grid that is used to show Switzerland's borders
       *
       * Due to the fact that no bins are created when there are no points that
       * fall within a bin, Switzerland has a few holes in the Alps.
       * @param svg
       * @returns {*}
       */
      function drawBackgroundGrid(svg) {
        // Create background shape of switzerland with all data points
        svg.append('g')
          .attr('clip-path', 'url(#clip)')
          .selectAll('.backgroundhex')
          .data(hexbin(scope.places))
          .enter().append('path')
          .attr('class', 'backgroundhex')
          .attr('d', hexbin.hexagon())
          .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
          })
          .style('fill', backgroundColor);

        return svg;
      }

      /**
       * Draws position and name of big cities to allow better understanding
       * of the map.
       * @param svg
       */
      function drawCities(svg) {
        var radius = 5;

        // Clean up – needed because new data will be painted on top of this
        // layer, so it needs to be refreshed.
        svg.selectAll('.city').remove();

        var cityNode = svg.selectAll('.city')
          .data(bigCities)
          .enter()
          .append('g')
          .classed('city', true)
          .attr('transform', function (d) {
            return 'translate(' + x(d.E) + ',' + y(d.N) + ')';
          });

        cityNode.append('circle')
          .attr('r', radius)
          .style('fill', cityMarkerColor);

        cityNode.append('text')
          .attr('dy', -radius * 2)
          .attr('dx', -radius)
          .text(function (d) {
            return d.namewithoutadditions;
          });

        return svg;
      }

      /**
       * Draws a legend – not as an SVG, but as normal divs that are partially
       * styled with CSS.
       */
      function drawLegend() {
        // Setup data
        var legendData = [];
        for (var i = 0; i < 21; i++) {
          legendData.push({
            number: i,
            color: color(i)
          })
        }

        // Find insertion point and add divs
        d3.select(element[0])
          .select('.legend')
          .selectAll('.legendbin')
          .data(legendData)
          .enter()
          .append('div')
          .classed('legendbin', true)
          .style('background-color', function (d) {
            return d.color
          })
          .attr('title', function (d) {
            return d.number
          })
          .append('span')
          .text(function (d) {
            return d.number
          });
      }

      /**
       * Draws the density grid.
       *
       * @param svg
       * @param regex {string} The regular expression used to look for placenames
       * @returns {*}
       */
      function drawPlaceNames(svg, regex) {

        // Create selection of points that contain the suffix
        var reg = new RegExp(regex, 'i');
        var points = scope.places.filter(function (value, index) {
          return reg.test(value.namewithoutadditions);
        });
        scope.foundPlaces = points.length;
        var bins = hexbin(points);

        // Delete previous hexbins
        d3.selectAll(identifier + ' .hexagon').remove();

        // Show selected
        svg.selectAll('.hexagon')
          .data(bins)
          .enter()
          .append('path')
          .attr('class', 'hexagon')
          .attr('data-content', function (d) {
            var str = "";
            d.forEach(function (val, i) {
              if (i > 0) {
                str += ", "
              }
              str += val.namewithoutadditions
            });
            return str;
          })
          .attr('data-position', 'top center')
          .attr('data-offset', hexbin.radius() / 2)
          .attr('d', hexbin.hexagon())
          .attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
          })
          .style('fill', function (d) {
            return color(d.length);
          });

        if (scope.showPopup) {
          element.find('.hexagon').popup();
        }

        return svg;
      }

      /**
       * This is being kicked off as soon as the placenames have finished loading.
       * @param data
       */
      function setupVisualisation() {

        // Populate City List
        populateBigCities();
        drawLegend();

        // Set up the visualisation
        scope.svg = setupSvg();
        drawBackgroundGrid(scope.svg);
        if (scope.chosenSuffix !== '') {
          drawPlaceNames(scope.svg, scope.chosenSuffix);
        }
        drawCities(scope.svg);


        // Remove the loading spinner
        element.find('.d3.graph').removeClass('loading');
      }

      /**
       * Updates the map
       * @param searchTerm
       */
      function updateMap(searchTerm) {
        scope.chosenSuffix = searchTerm;
        drawPlaceNames(scope.svg, searchTerm);
        drawCities(scope.svg);
      }

      /**
       * Populates the Big City List with actual data
       */
      function populateBigCities() {
        var searchExpression = new RegExp('^(' + bigCityNames.join('|') + ')$',
          'i');
        bigCities = scope.places.filter(function (value) {
          return searchExpression.test(value.namewithoutadditions);
        })
      }

      /**
       * Prepares the SVG element and makes sure it scales.
       * @returns {*}
       */
      function setupSvg() {
        // Setup SVG
        var svg = d3.select(element[0])
          .select('.d3.graph')
          .append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('viewBox', '0 0 ' + width + ' ' + height)
          .attr('preserveAspectRatio', 'xMidYMid meet');

        svg.append('clipPath')
          .attr('id', 'clip')
          .append('rect')
          .attr('class', 'mesh')
          .attr('width', width)
          .attr('height', height);

        return svg;
      }

      /*-----------------------------------------
       FUNCTIONS
       ------------------------------------------*/

      /**
       * This function contains all steps to set up the directive.
       */
      function activate() {

        //Initialize Dropdown, and bind the onChange action to kick off the
        // drawing of the places
        // Dropdown functionality is provided by Semantic UI JS.
        element.find('.ui.dropdown').dropdown({
          action: 'activate',
          onChange: function (value, text, $selectedItem) {
            scope.updateMap(value);
            scope.$apply();
          }
        });

        setupVisualisation();
      }
    }


  }

})(jQuery, d3, angular);
