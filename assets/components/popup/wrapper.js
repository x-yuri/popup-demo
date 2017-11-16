import frontEndVars from '../../front-end-vars';
import $ from '../../qwery';
import bean from '../../bean';

export default class Wrapper {
    constructor(popup, options = {}) {
        this.$popup = $(popup);
        this._options = options;
        if (this.options('mode') == 'hideViewportScrollbars') {
            this.$el = $(document.createElement('div'));
            this.$el.attr('class', 'popup-wrapper');
            if (this.options('scrollbars')['vert'])
                this.$el.css('overflow-y', 'scroll');
            if (this.options('scrollbars')['horz'])
                this.$el.css('overflow-x', 'scroll');

            const $popupWrapper2 = $(document.createElement('table'));
            $popupWrapper2.attr('class', 'popup-wrapper-2');

            const row = $popupWrapper2[0].insertRow();

            const $popupWrapper3 = $(row.insertCell());
            $popupWrapper3.attr('class', 'popup-wrapper-3');

            this.$el.append($popupWrapper2);
            $popupWrapper3.append(this.$popup);
            document.body.appendChild(this.$el[0]);

            bean.on(this.$el[0], 'click', () => {
                if ( ! this.popupClicked())
                    this.options('onClick')();
                this.popupClicked(false);
            });
        } else {
            document.body.appendChild(this.$popup[0]);
        }
    }

    popupClicked(popupClicked) {
        if (popupClicked != null)
            this._popupClicked = popupClicked;
        return this._popupClicked;
    }

    updateExtents() {
        if (this.options('mode') == 'hideViewportScrollbars') {
            let paddingTop = (this.$el[0].clientHeight - this.$popup[0].offsetHeight) / 3
                - parseInt(frontEndVars['popup-min-margin']);
            if (paddingTop < 0)
                paddingTop = 0;
            this.$el.css('padding-top', paddingTop + 'px');
        }
    }

    destroy() {
        if (this.options('mode') == 'hideViewportScrollbars')
            this.$el.remove();
        else
            this.$popup.remove();
    }

    options(options) {
        if (options != null && typeof options != 'string')
            Object.assign(this._options, options);
        return options && typeof options == 'string'
            ? this._options[options]
            : this._options;
    }
}
