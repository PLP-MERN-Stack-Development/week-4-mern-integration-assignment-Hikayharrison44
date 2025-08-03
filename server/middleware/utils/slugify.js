// utils/slugify.js
module.exports = function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};