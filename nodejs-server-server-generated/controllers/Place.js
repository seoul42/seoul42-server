'use strict';

var utils = require('../utils/writer.js');
var Place = require('../service/PlaceService');

module.exports.searchPlace = function searchPlace (req, res, next) {
  var lat = req.swagger.params['lat'].value;
  var lng = req.swagger.params['lng'].value;
  var radius = req.swagger.params['radius'].value;
  var category = req.swagger.params['category'].value;
  Place.searchPlace(lat,lng,radius,category)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
