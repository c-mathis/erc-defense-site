module.exports = function(eleventyConfig) {
  // Add year filter for copyright
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Filter to get keyword data by ID
  eleventyConfig.addFilter("getKeyword", (keywords, id) => {
    return keywords.keywords[id] || null;
  });

  // Filter to get pages by status
  eleventyConfig.addFilter("filterByStatus", (pages, status) => {
    return pages.filter(p => p.status === status);
  });

  // Filter to get pages by priority
  eleventyConfig.addFilter("filterByPriority", (pages, priority) => {
    return pages.filter(p => p.priority === priority);
  });

  // Filter to get pages by hub
  eleventyConfig.addFilter("filterByHub", (pages, hubId) => {
    return pages.filter(p => p.hub === hubId);
  });

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for changes
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/_data/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
