import { ChainablePromiseElement } from 'webdriverio';

export type TTextCondition =
  | 'be'
  | 'not be'
  | 'contain'
  | 'not contain'
  | 'matches'
  | 'not matches';
export type TElement = ChainablePromiseElement<WebdriverIO.Element>;
