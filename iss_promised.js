const request = require('request-promise-native');
// const { fetchMyIP } = require('./iss');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(ipInput) {
  let ip = JSON.parse(ipInput)['ip'];
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(objLonLat) {
  let convRet = JSON.parse(objLonLat);
  const url =`http://api.open-notify.org/iss-pass.json?lat=${convRet['latitude']}&lon=${convRet['longitude']}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes);
  // .then(() => {
  //   const { response } = JSON.parse(data);
  //   return response;
  // })
}

module.exports = { nextISSTimesForMyLocation };