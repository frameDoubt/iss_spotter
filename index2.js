const request = require('request-promise-native');
const { nextISSTimesForMyLocation } = require('./iss_promised');
// const { printPassTimes } = require('./index');
const printPassTimes = function(passTimes) {
  let convRet = JSON.parse(passTimes)['response'];
  for (const pass of convRet) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    // console.log(typeof passTimes);
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
