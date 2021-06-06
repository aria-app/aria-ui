import { isLightColor } from '../../src';

test('it should return true when given a light color in hex format', () => {
  const result = isLightColor('#ccc');

  expect(result).toBe(true);
});

test('it should return false when given a dark color in hex format', () => {
  const result = isLightColor('#333');

  expect(result).toBe(false);
});
