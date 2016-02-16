var jsdom = require("jsdom");
var ProfileClass = require("./lib/profile"),
    Experience = require("./lib/experience"),
    Honors = require("./lib/honors"),
    Project = require("./lib/projects"),
    Education = require("./lib/education"),
    Language = require("./lib/language");

function getProfile(linkedInURL, callback) {
    jsdom.env({
        url: linkedInURL,
        scripts: ["http://code.jquery.com/jquery.js"],
        headers: {
            'Accept':'text/html',
            //'Accept-Encoding': 'gzip',
            'Accept-Language': 'en-US;q=0.6,en;q=0.4',
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36'
        },
        proxy: process.env.PROXY_HOST,
        tunnel: process.env.PROXY_HOST ? false : undefined,
        done: function (errors, window) {
            console.log(errors);
            if (errors) return callback(new ProfileClass());
            var $ = window.$;
            console.log($('html').html());
            var profile = new ProfileClass();

            profile.publicProfileUrl = linkedInURL;
            profile.name = $("#name h1 span span").text();
            profile.pictureUrl = $(".profile-picture img").attr("src");
            profile.headline = $("#headline p").text();
            profile.location = $("#location dl dd span").text();
            profile.summary = $(".summary .description").text();
            profile.current = $("#overview-summary-current td ol li a").text();
            $("#overview-summary-past td ol li").each(function () {
                var company = $(this).text();
                company = company.split(",")[0];
                profile.past.push(company);
            });

            profile.education = $("#overview-summary-education td ol li").text();
            $("#overview-summary-websites td ul li").each(function () {
                profile.websites.push($(this).find("a[href]").attr("href"));
            });
            $("#background-experience div div").each(function () {
                profile.positions.push(new Experience($(this).find("header h4").text(),
                    $(this).find("header a").text(),
                    $(this).find(".experience-date-locale").clone().find(".locality").remove().end().text(),
                    $(this).find("span span.locality").text(),
                    $(this).find("p").html()
                ));
            });
            $("#background-honors div div div").each(function () {
                profile.honors.push(new Honors($(this).find("h4 span").text(),
                    $(this).find("h5 span").text(),
                    $(this).find("> span").text(),
                    $(this).find("p").text()
                ));
            });

            $("#background-projects div div").each(function () {
                profile.projects.push(new Project($(this).find("hgroup h4 a span:first").text(),
                    $(this).find("> span.projects-date").text(),
                    $(this).find("> p").text(),
                    $(this).find("hgroup h4 a[href]").attr("href")
                ));
            });

            $("#background-education div div div").each(function () {
                profile.educations.push(new Education($(this).find("header h4").text(),
                    $(this).find("header h4 a[href]").attr("href"),
                    $(this).find("header h5 span:first").text(),
                    $(this).find("header h5 span:eq(2)").text(),
                    $(this).find("header h5 span:last").text(),
                    $(this).find("> span").text()
                ));
            });

            $("#skills-item .skill-pill a").each(function () {
                profile.skills.push($(this).text());
            });

            $("#languages .section-item").each(function () {
                var lang = $(this);
                profile.languages.push(new Language(
                    lang.find("h4 span").text(),
                    lang.find(".languages-proficiency").text().toLowerCase()
                ));
            });

            callback(profile);
        }
    });
}

module.exports = getProfile;