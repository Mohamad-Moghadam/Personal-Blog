/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.msoodmandm.ir', // your real website URL
  generateRobotsTxt: true,               // optional: generates robots.txt
  sitemapSize: 7000,                     // optional: max URLs per sitemap
  changefreq: 'daily',                   // optional: frequency for search engines
  priority: 0.7,                         // optional: default priority
  // Optional: exclude specific paths
  // exclude: ['/secret', '/admin/**'],
}
