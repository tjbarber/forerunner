'use strict';

var forerunner = require('../index.js');

exports.testMetadata = {
  metadata: function(test) {
    forerunner.metadataRequest('campaign-missions', function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },
  gameVarients: function(test) {
    forerunner.gameVarients({id: "7b3eed29-b449-428b-b361-355dff4ef0ff"}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },
  mapVarients: function(test) {
    forerunner.mapVarients({id: "14bda915-64d8-4ad5-be9e-871fa17badda"}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },
  gameBaseVarients: function(test) {
    forerunner.metadataRequest('game-base-variants', function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },
  reqPack: function(test) {
    forerunner.reqPack({id: '3a4086f1-571b-4e91-ac4b-43aed9c11caa'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },
  req: function(test) {
    forerunner.req({id: 'ba59266e-b6cd-4d1f-bd39-ddcc3c5f1a0f'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  }
}