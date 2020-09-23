const rsshub = {
  init: () => {},
  get: async () => {
    return {
      title: "Title test",
      link: "https://douban.com/test/1",
      description: "Description test",
      item: [
        {
          title: "Title item test",
          link: "https://douban.com/test/1/item/1",
          description: "Description item test",
        },
      ],
    };
  },
};

module.exports = rsshub;
