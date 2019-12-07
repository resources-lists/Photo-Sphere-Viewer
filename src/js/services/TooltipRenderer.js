import { AbstractService } from './AbstractService';
import { each, getStyle } from '../utils';
import { Tooltip } from '../components/Tooltip';
import { EVENTS } from '../data/constants';

/**
 * @summary Tooltip renderer
 * @extends PSV.services.AbstractService
 * @memberof PSV.services
 */
export class TooltipRenderer extends AbstractService {

  /**
   * @param {PSV.Viewer} psv
   */
  constructor(psv) {
    super(psv);

    const testTooltip = new Tooltip(this.psv);

    /**
     * @summary Computed static sizes
     * @member {Object}
     * @package
     * @property {number} arrowSize
     * @property {number} offset
     */
    this.size = {
      arrow : parseInt(getStyle(testTooltip.arrow, 'borderTopWidth'), 10),
      offset: parseInt(getStyle(testTooltip.container, 'outlineWidth'), 10),
    };

    testTooltip.destroy();

    /**
     * @summary List of visible tooltips
     * @member {PSV.components.Tooltip[]}
     * @private
     */
    this.tooltips = [];

    this.psv.on(EVENTS.HIDE_TOOLTIP, this);
  }

  /**
   * @override
   */
  destroy() {
    each(this.tooltips, tooltip => tooltip.destroy());

    delete this.tooltips;
    delete this.size;

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
      case EVENTS.HIDE_TOOLTIP: this.__onHide(e.args[1]); break;
      // @formatter:on
    }
    /* eslint-enable */
  }

  /**
   * @summary Displays a new tooltip
   * @param {Tooltip.Config} config
   * @returns {PSV.components.Tooltip}
   */
  create(config) {
    const tooltip = new Tooltip(this.psv, this.size);
    tooltip.show(config);

    this.tooltips.push(tooltip);

    return tooltip;
  }

  /**
   * @summary Removes the hidden tooltip from the list
   * @param {PSV.components.Tooltip} tooltip
   * @private
   */
  __onHide(tooltip) {
    const idx = this.tooltips.indexOf(tooltip);
    if (idx !== -1) {
      this.tooltips.splice(idx, 1);
    }
  }

}
