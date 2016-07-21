'use strict';

var Forerunner = require('../index.js');
var forerunner = new Forerunner('4826b671afa84fbbba1fdc512ab41fc1');

exports.testStats = {
  eventsForMatch: function(test) {
    forerunner.eventsForMatch({matchId: 'c5e30620-3256-4b4e-be67-64fb511fd16d'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    })
  },
  matchesForPlayer: function(test) {
    forerunner.matchesForPlayer({gamertag: 'TorpedoSkyline'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    })
  },
  playerLeaderboard: function(test) {
    forerunner.playerLeaderboard({seasonId: '2fcc20a0-53ff-4ffb-8f72-eebb2e419273', playlistId: '5728f612-3f20-4459-98bd-3478c79c4861'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    })
  },
  postGameCarnageReport: function(test) {
    forerunner.postGameCarnageReport({type: 'warzone', matchId: 'c5e30620-3256-4b4e-be67-64fb511fd16d'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    })
  },
  serviceRecord: function(test) {
    forerunner.serviceRecord({type: 'arena', gamertags: 'TorpedoSkyline'}, function(err, res, body) {
      test.equal(res.statusCode, 200);
      test.done();
    })
  }
}