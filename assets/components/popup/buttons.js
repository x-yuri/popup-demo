import _ from 'lodash';

import $ from '../../qwery';
import bean from '../../bean';
import Button from '../button';
import LinkButton from '../link-button';

export default class Buttons {
    constructor(el, options = {}) {
        this._options = options;
        this.$el = $(document.createElement('div'));
        this.$el.attr('class', 'b-popup-buttons');
        this.$el.html(_.template(
            '<span role="<%- options["mainButton"]["role"] %>"'
            + ' class="main-button b-button">'
                + '<span class="fleck"></span>'
                + '<%- options["mainButton"]["label"] %>'
            + '</span>'
            + '<% if (options["auxiliaryButton"]) { %>'
                + '<span role="<%- options["auxiliaryButton"]["role"] %>"'
                + ' class="auxiliary-button b-button gray">'
                    + '<%- options["auxiliaryButton"]["label"] %>'
                + '</span>'
            + '<% } %>'
        )({options: this._options}));
        $(el).replaceWith(this.$el);

        this.$mainButton = $('.main-button', this.$el);
        this.$auxiliaryButton = $('.auxiliary-button', this.$el);
        const mainButton = new Button(this.$mainButton);
        const auxiliaryButton = this.$auxiliaryButton.length ?
            new Button(this.$auxiliaryButton)
        : null;

        bean.on(this.$mainButton[0], 'press', this._options['mainButton']['onPress']);
        if (this.$auxiliaryButton.length)
            bean.on(this.$auxiliaryButton[0], 'press',
                this._options['auxiliaryButton']['onPress']);
    }

    press(button) {
        const $button = button == 'main-button' ? this.$mainButton : this.$auxiliaryButton;
        bean.fire($button[0], 'press');
    }
}
