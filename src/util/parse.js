const { htmlToText } = require("html-to-text");

const text = (html) => {
  return htmlToText(html);
};

module.exports = { text };
