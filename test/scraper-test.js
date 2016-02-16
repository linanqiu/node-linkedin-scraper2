'use strict';
var linkedinScraper = require('../'),
    should = require('should');

describe('<LinkedIn Scraper>', function() {
    this.timeout(10000);
    it('get profile', function(done) {
        var url = 'https://br.linkedin.com/in/danieljoppi';
        linkedinScraper(url, function (profile) {
            //console.log(profile);

            should(profile).be.ok();
            should(profile).have.property('name', 'Daniel Henrique Joppi');
            should(profile).have.property('headline', 'Software Architect na Rospo GeoTech');
            should(profile).have.property('location', 'Florianópolis, Santa Catarina, Brazil');
            should(profile).have.property('summary').be.ok();
            should(profile).have.property('publicProfileUrl', url);
            should(profile).have.property('languages').length(5);
            should(profile).have.property('skills').length(45);
            should(profile).have.property('currentPositions').length(3);
            should(profile).have.property('pastPositions').length(3);
            should(profile).have.property('educations').length(1);
            should(profile).have.property('positions').length(8);
            //should(profile).have.property('honors').length(0);
            //should(profile).have.property('projects').length(0);

            return done();
        });
    });
});
