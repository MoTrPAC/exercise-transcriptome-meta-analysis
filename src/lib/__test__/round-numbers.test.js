import '@testing-library/jest-dom/extend-expect';
import roundNumbers from '../round-numbers';

describe('Rounding numbers', () => {
  test('rounding exponential string', () => {
    expect(roundNumbers('4.34225220539258e-09', 2)).toBe('4.34e-9');
  });
  test('rounding decimal number', () => {
    expect(roundNumbers('0.0034225220539258', 2)).toBe('3.42e-3');
  });
  test('returning a 0 value as 0', () => {
    expect(roundNumbers('0', 2)).toBe(0);
  });
  test('returning a null value as Unavailable', () => {
    expect(roundNumbers(null, 2)).toBe('Unavailable');
  });
});
