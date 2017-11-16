import $ from '../../qwery';
import bean from '../../bean';

export default class Overlay {
    constructor(options = {}) {
        this._options = options;
        this.$el = $(document.createElement('div'));
        this.$el.attr('class', 'b-popup-overlay');
        document.body.appendChild(this.$el[0]);
        bean.on(this.$el[0], 'click', this._options['onClick']);
    }

    destroy() {
        this.$el.remove();
    }
}
