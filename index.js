const rsshub = require("./rsshub");
const config = require("rsshub/lib/config").value;
const run = require("./run");
module.exports = class Example {
  constructor({ helpers, options }) {
    this.options = options;
    this.helpers = helpers;
  }
  async run() {
    const items = await run({
      triggerOptions: this.options,
      rsshub: rsshub,
      config: config,
    });
    return items;
  }
  getItemKey(item) {
    // TODO adapt every cases
    if (item.guid) return item.guid;
    if (item.link) return item.link;
    if (item.id) return item.id;
    return this.helpers.createContentDigest(item);
  }
};
