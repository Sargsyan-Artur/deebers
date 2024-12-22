import { TElement, TTextCondition } from '../../types';

export class Expects {
  constructor (private readonly element: TElement) {}

  public async textToBe (
    text: string,
    condition: TTextCondition,
    expectedText
  ): Promise<any> {
    switch (condition) {
      case 'be':
        expect(text).toBe(expectedText);
        break;
      case 'contain':
        expect(text).toContain(expectedText);
        break;
      case 'matches':
        expect(text).toMatch(expectedText);
        break;
      default:
        throw new Error(`There is no condition type with ${condition} name.`);
    }
  }
}
