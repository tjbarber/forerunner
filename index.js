'use strict';

// libraries
var request = require('request');

var generateDataStr = function generateDataStr(data) {
  if (!Array.isArray(data)) return data;
  return data.join(',');
}

var generateRequest = function generateRequest(route, queryType, data) {
  if (!data) var data = {};
  var gtStr   = generateDataStr(data.gamertags),
    seasonStr = generateDataStr(data.seasonIds),
    modes     = generateDataStr(data.modes),
    sizes     = generateDataStr(data.sizes);

  return {
    method: 'GET',
    url: generateUrl(route, {
      queryType: queryType,
      gamertags: gtStr,
      seasonIds: seasonStr,
      modes: modes,
      start: data.start,
      count: data.count,
      sizes: sizes
    }),
    headers: {
      'Ocp-Apim-Subscription-Key': this.apiKey
    }
  }
}

var generateUrl = function generateUrl(route, data) {
  var url = 'https://www.haloapi.com/' + data.queryType + '/h5/' + route;
  
  if (data.gamertags) {
    url += ('?players=' + data.gamertags)
  }

  if (data.seasonIds) {
    url += ('?seasonId=' + data.seasonIds)
  }

  if (data.modes) {
    url += ('?modes=' + data.modes)
  }

  if (data.start) {
    url += ('?start=' + data.start)
  }

  if (data.count) {
    url += ('?count=' + data.count);
  }

  console.log(url);
  return url;
}

// metadata

var Forerunner = function Forerunner(apiKey) { 
  this.apiKey = apiKey; 
};

Forerunner.prototype.metadataRequest = function campaignMissions(type, callback) {
  request(generateRequest.call(this, 'metadata/' + type, 'metadata'), callback);
};

Forerunner.prototype.gameVarients = function gameVarients(data, callback) {
  request(generateRequest.call(this, 'metadata/game-variAnts/' + data.id, 'metadata', data), callback);
}

Forerunner.prototype.mapVarients = function mapVarients(data, callback) {
  request(generateRequest.call(this, 'metadata/map-variants/' + data.id, 'metadata', data), callback);
}

Forerunner.prototype.reqPack = function reqPacks(data, callback) {
  request(generateRequest.call(this, 'metadata/requisition-packs/' + data.id, 'metadata', data), callback);
}

Forerunner.prototype.req = function req(data, callback) {
  request(generateRequest.call(this, 'metadata/requisitions/' + data.id, 'metadata', data), callback);
}

// profile

Forerunner.prototype.emblemImage = function emblemImage(data, callback) {
  request(generateRequest.call(this, 'profiles/' + data.gamertag + '/emblem', 'profile', data), callback);
};

Forerunner.prototype.spartanImage = function spartanImage(data, callback) {
  if (['full','portrait'].indexOf(data.crop) === -1) {
    data.crop = 'full';
  }

  if (!data.size) {
    data.size = '256';
  }

  request(generateRequest.call(this, 'profiles/' + data.gamertag + '/spartan?crop=' + data.crop + '&size=' + data.size, 'profile', data), callback);
}

// stats 

Forerunner.prototype.eventsForMatch = function eventsForMatch(data, callback) {
  request(generateRequest.call(this, 'matches/' + data.matchId + '/events', 'stats', data), callback);
};

Forerunner.prototype.matchesForPlayer = function matchesForPlayer(data, callback) {
  request(generateRequest.call(this, 'players/' + data.gamertag + '/matches', 'stats', data), callback);
};

Forerunner.prototype.playerLeaderboard = function playerLeaderboard(data, callback) {
  request(generateRequest.call(this, 'player-leaderboards/csr/' + data.seasonId + '/' + data.playlistId, 'stats', data), callback);
}

Forerunner.prototype.postGameCarnageReport = function postGameCarnageReport(data, callback) {
  request(generateRequest.call(this, data.type + '/matches/' + data.matchId, 'stats', data), callback);
}

Forerunner.prototype.serviceRecord = function serviceRecord(data, callback) {
  request(generateRequest.call(this, 'servicerecords/' + data.type, 'stats', data), callback);
};

module.exports = Forerunner;