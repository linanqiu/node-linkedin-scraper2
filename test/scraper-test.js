'use strict';
var linkedinScraper = require('../'),
    should = require('should');

describe('<LinkedIn Scraper>', function() {
    this.timeout(10000);

    var url = 'https://br.linkedin.com/in/linanqiu';

    function validateProfile(profile) {
        should(profile).be.ok();
        should(profile).have.property('name', 'Linan Qiu');
        should(profile).have.property('headline', 'Trading Technology Associate at Bridgewater Associates');
        should(profile).have.property('location', 'Stamford, Connecticut');
        should(profile).have.property('summary').be.ok();
        should(profile).have.property('languages').length(3);
        should(profile).have.property('skills').length(26);
        should(profile).have.property('currentPositions').length(1);
        should(profile).have.property('pastPositions').length(3);
        should(profile).have.property('educations').length(2);
        should(profile).have.property('positions').length(9);
        should(profile).have.property('publicProfileUrl', url);
        should(profile).have.property('peopleAlsoViewed').length(10);
    }

    it('get profile with callback', function(done) {

        linkedinScraper(url, function (err, profile) {
            //console.log(JSON.stringify(profile, null, '   '));

            should(err).be.not.ok();

            validateProfile(profile);
            return done();
        });
    });

    it('get profile with promise', function(done) {
        linkedinScraper(url).then(function (profile) {

            validateProfile(profile);
            return done();
        });
    });
});
