import _ from 'lodash';

import $ from '../../qwery';
import bean from '../../bean';
import Button from '../button';

export default class Header {
    constructor(el, options = {}) {
        this._options = options;
        this.$el = $(document.createElement('div'));
        this.$el.attr('class', 'b-popup-header');
        this.$el.html(_.template(
            '<span role="button" class="close-button">&#x00d7;</span>'
            + '<div class="title">'
                + '<%- options["title"] %>'
            + '</div>'
        )({options: this._options}));
        $(el).replaceWith(this.$el);
        const $closeButton = $('.close-button', this.$el);
        new Button($closeButton);

        bean.on($closeButton[0], 'press', this._options['onCloseClick']);
    }
}
