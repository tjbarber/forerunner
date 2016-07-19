'use strict';

// libraries
var request = require('request');

var apiKey  = "4826b671afa84fbbba1fdc512ab41fc1"

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
      'Ocp-Apim-Subscription-Key': apiKey
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

exports.metadataRequest = function campaignMissions(type, callback) {
  request(generateRequest('metadata/' + type, 'metadata'), callback);
};

exports.gameVarients = function gameVarients(data, callback) {
  request(generateRequest('metadata/game-variAnts/' + data.id, 'metadata', data), callback);
}

exports.mapVarients = function mapVarients(data, callback) {
  request(generateRequest('metadata/map-variants/' + data.id, 'metadata', data), callback);
}

exports.reqPack = function reqPacks(data, callback) {
  request(generateRequest('metadata/requisition-packs/' + data.id, 'metadata', data), callback);
}

exports.req = function req(data, callback) {
  request(generateRequest('metadata/requisitions/' + data.id, 'metadata', data), callback);
}

// profile

exports.emblemImage = function emblemImage(data, callback) {
  request(generateRequest('profiles/' + data.gamertag + '/emblem', 'profile', data), callback);
};

exports.spartanImage = function spartanImage(data, callback) {
  if (['full','portrait'].indexOf(data.crop) === -1) {
    data.crop = 'full';
  }

  if (!data.size) {
    data.size = '256';
  }

  request(generateRequest('profiles/' + data.gamertag + '/spartan?crop=' + data.crop + '&size=' + data.size, 'profile', data), callback);
}

// stats

exports.eventsForMatch = function eventsForMatch(data, callback) {
  request(generateRequest('matches/' + data.matchId + '/events', 'stats', data), callback);
};

exports.matchesForPlayer = function matchesForPlayer(data, callback) {
  request(generateRequest('players/' + data.gamertag + '/matches', 'stats', data), callback);
};

exports.playerLeaderboard = function playerLeaderboard(data, callback) {
  request(generateRequest('player-leaderboards/csr/' + data.seasonId + '/' + data.playlistId, 'stats', data), callback);
}

exports.postGameCarnageReport = function postGameCarnageReport(data, callback) {
  request(generateRequest(data.type + '/matches/' + data.matchId, 'stats', data), callback);
}

exports.serviceRecord = function serviceRecord(data, callback) {
  request(generateRequest('servicerecords/' + data.type, 'stats', data), callback);
};