import { sum } from "../sum";

test("Sum function should calculate sum of two numbers", () => {
  const result = sum(3, 4);

  // This line called assertion
  expect(result).toBe(7);
});
