const { dummy } = require('../utils/list_helper');

test('dummy returns 1', () => {
  const blogs = [];
  expect(dummy(blogs)).toBe(1);
});
