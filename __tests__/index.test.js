const run = require("../run");

test("test trigger run", async () => {
  const result = await run({
    triggerOptions: {
      path: "/smzdm/keyword/女装",
    },
    rsshub: require("../__mocks__/rsshub"),
    config: {
      titleLengthLimit: 150,
    },
  });
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(1);
  expect(result[0]).toHaveProperty("__channel_title");
});
