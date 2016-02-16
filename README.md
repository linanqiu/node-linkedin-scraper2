# node-linkedin-scraper2 [![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

A simple LinkedIn profile scraper for nodejs, based on original [linkedin-scraper](https://github.com/aadisriram/nodejs-linkedin-scraper).

## Install [![Dependency Status][david-image]][david-url] [![devDependency Status][david-image-dev]][david-url-dev]
```bash
    npm install linkedin-scraper2 --save
```

<h1> Example Usage </h1>

<div class="highlight highlight-js"><pre><span class="pl-c">// Scrape a linkedin profile for the public contents</span>
<span class="pl-s">var</span> linkedinScraper <span class="pl-k">=</span> <span class="pl-s3">require</span>(<span class="pl-s1"><span class="pl-pds">"</span>linkedin-scraper<span class="pl-pds">"</span></span>);

linkedinScraper(url,
  <span class="pl-st">function</span> (<span class="pl-vpf">linkedinObject</span>) {
    <span class="pl-en">console</span><span class="pl-s3">.log</span>(<span class="pl-s1">linkedinObject</span>);
  }
);</pre></div>

<h1> Sample Output </h1>

http://pastebin.com/jipY0hzj

[npm-url]: https://npmjs.org/package/linkedin-scraper2
[npm-image]: http://img.shields.io/npm/v/linkedin-scraper2.svg

[travis-url]: https://travis-ci.org/danieljoppi/linkedin-scraper2
[travis-image]: https://img.shields.io/travis/danieljoppi/linkedin-scraper2.svg

[coveralls-url]: https://coveralls.io/r/danieljoppi/linkedin-scraper2
[coveralls-image]: http://img.shields.io/coveralls/danieljoppi/linkedin-scraper2/master.svg

[david-url]: https://david-dm.org/danieljoppi/linkedin-scraper2
[david-image]: https://david-dm.org/danieljoppi/linkedin-scraper2.svg

[david-url-dev]: https://david-dm.org/danieljoppi/linkedin-scraper2#info=devDependencies
[david-image-dev]: https://david-dm.org/danieljoppi/linkedin-scraper2/dev-status.svg