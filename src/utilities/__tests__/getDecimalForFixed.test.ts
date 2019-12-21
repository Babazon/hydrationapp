import { getDecimalForFixed } from "../getDecimalForFixed"

describe('getDecimalForFixed tests', () => {

  it('returns 1 if the remainder of the value divided by 1 is greater than or equal to 0.1', () => {
    expect(getDecimalForFixed(1.1)).toBe(1);
    expect(getDecimalForFixed(1.9)).toBe(1);
  })

  it('returns 0 if the remainder of the value divided by 1 is less than 0.1', () => {
    expect(getDecimalForFixed(1.09)).toBe(0);
    expect(getDecimalForFixed(1.0000001)).toBe(0);
  })
})
