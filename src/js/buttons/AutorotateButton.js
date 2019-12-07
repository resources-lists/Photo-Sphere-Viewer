import { AbstractButton } from './AbstractButton';
import { EVENTS } from '../data/constants';

/**
 * @summary Navigation bar autorotate button class
 * @extends PSV.buttons.AbstractButton
 * @memberof PSV.buttons
 */
export class AutorotateButton extends AbstractButton {

  static get id() {
    return 'autorotate';
  }

  static get icon() {
    return 'play';
  }

  static get iconActive() {
    return 'playActive';
  }

  get collapsable() {
    return true;
  }

  /**
   * @param {PSV.components.Navbar} navbar
   */
  constructor(navbar) {
    super(navbar, 'psv-button--hover-scale psv-autorotate-button');

    this.psv.on(EVENTS.AUTOROTATE, this);
  }

  /**
   * @override
   */
  destroy() {
    this.psv.off(EVENTS.AUTOROTATE, this);

    super.destroy();
  }

  /**
   * @summary Handles events
   * @param {Event} e
   * @private
   */
  handleEvent(e) {
    /* eslint-disable */
    switch (e.type) {
      // @formatter:off
      case EVENTS.AUTOROTATE: this.toggleActive(e.args[0]); break;
      // @formatter:on
    }
    /* eslint-enable */
  }

  /**
   * @override
   * @description Toggles autorotate
   */
  __onClick() {
    this.psv.toggleAutorotate();
  }

}
