'use strict';

var forerunner = require('../index.js');

exports.testProfile = {
  emblem: function(test) {
    forerunner.emblemImage({gamertag: 'TorpedoSkyline'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    })
  },
  spartanImage: function(test) {
    forerunner.spartanImage({gamertag: 'TorpedoSkyline'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },
  spartanImageWithSize: function(test) {
    forerunner.spartanImage({gamertag: 'TorpedoSkyline', size: '512'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },
  spartanImageWithSizeCrop: function(test) {
    forerunner.spartanImage({gamertag: 'TorpedoSkyline', size: '256', crop: 'portrait'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  }
}


    

    