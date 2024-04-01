import '@testing-library/jest-dom';
import getSuggestions from '../auto-suggest';

const mockList = [
  'VEGFA',
  'VEGFB',
  'VEGFC',
  'VEGFD',
];

describe('Get suggestions', () => {
  test('returning empty array for null input value', () => {
    expect(getSuggestions(' ', mockList)).toEqual(expect.arrayContaining([]));
  });
  test('returning all items in array', () => {
    expect(getSuggestions('VEGF', mockList)).toEqual(expect.arrayContaining(mockList));
  });
  test('returning one item from array', () => {
    expect(getSuggestions('VEGFA', mockList)).toEqual(expect.arrayContaining(['VEGFA']));
  });
});
