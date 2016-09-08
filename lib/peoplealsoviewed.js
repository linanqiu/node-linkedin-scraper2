'use strict';

module.exports = function (div) {
  return {
    name: div.find('a').text(),
    url: div.find('a').attr('href').replace('?trk=pub-pbmap', ''),
    userId: div.find('a').attr('href').replace('?trk=pub-pbmap', '').replace('https://www.linkedin.com/in/', ''),
    headline: div.find('p.headline').text()
  }
};
