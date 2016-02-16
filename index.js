var jsdom = require('jsdom'),
    Q = require('q');

module.exports = function (originalUrl, callback) {
    var deferred = Q.defer();
    if (!callback) {
        callback = deferred.resolve;
    }

    var profileFactory = require('./lib/profile');
    var linkedInURL = originalUrl.replace(/[a-z]*\.linkedin/, 'www.linkedin');

    jsdom.env({
        url: linkedInURL,
        scripts: ['http://code.jquery.com/jquery.js'],
        headers: {
            'Accept': 'text/html',
            //'Accept-Encoding': 'gzip',
            'Accept-Language': 'en-US;q=0.6,en;q=0.4',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36'
        },
        proxy: process.env.PROXY_HOST,
        tunnel: process.env.PROXY_HOST ? false : undefined,
        done: function (errors, window) {
            if (errors) {
                callback(profileFactory());
            } else {
                var profile = profileFactory(window);
                profile.publicProfileUrl = originalUrl;

                callback(profile);
            }
        }
    });

    return deferred.promise;
};