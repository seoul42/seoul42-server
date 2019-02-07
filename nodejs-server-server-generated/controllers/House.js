'use strict';

var utils = require('../utils/writer.js');
var House = require('../service/HouseService');

module.exports.searchHouse = function searchHouse (req, res, next) {
  var address = req.swagger.params['address'].value;
  House.searchHouse(address)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
