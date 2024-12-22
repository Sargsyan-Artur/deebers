import { Waits } from './helpers/waits';
import { Expects } from './helpers/expects';
import { Actions } from './helpers/actions';

export class Element {
  public wait: Waits;
  public expect: Expects;
  public actions: Actions;

  constructor (private readonly element) {
    this.wait = new Waits(element);
    this.expect = new Expects(element);
    this.actions = new Actions(element);
  }

  static init (element) {
    return new Element(element);
  }
}
