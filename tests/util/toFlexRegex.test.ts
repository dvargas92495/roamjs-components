import toFlexRegex from "../../src/util/toFlexRegex";

test("toFlexRegex - Handles keys with parens", () => {
  const key = "Hello (World)";
  expect(toFlexRegex(key).test(key)).toBe(true);
});
