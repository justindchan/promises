/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var gh = require('./promisification.js');
var pc = require('./promiseConstructor.js');
Promise.promisifyAll(fs);



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pc.pluckFirstLineFromFileAsync(readFilePath)
    .catch(function(err) {
      console.log('Oops, caught an error: ', err.message);
    })
    .then(function(userName) {
      if(!userName) {
        throw new Error('No user found!');
      } else {
        return userName;
      }
    })
    .then(function(userName) {
      return gh.getGitHubProfileAsync(userName);
    })
    .catch(function(err) {
      console.log('Oops, caught an error: ', err.message);
    })
    .then(function(gitHubBody) {
        console.log('hey we got here');
        return fs.writeFileAsync(writeFilePath, JSON.stringify(gitHubBody));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

// Promisification: gh
// module.exports = {
//   getGitHubProfileAsync: getGitHubProfileAsync,
//   generateRandomTokenAsync: generateRandomTokenAsync,
//   readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
// };
// promiseConstructor: pc
// module.exports = {
//   getStatusCodeAsync: getStatusCodeAsync,
//   pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
// };