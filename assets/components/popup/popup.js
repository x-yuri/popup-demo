import _ from 'lodash';

import frontEndVars from '../../front-end-vars';
import * as common from '../../common';
import $ from '../../qwery';
import bean from '../../bean';
import Overlay from './overlay';
import PopupWrapper from './wrapper';
import popupManager from './manager';
import Header from './header';
import Buttons from './buttons';

export default class Popup {
    constructor(options = {}) {
        this._options = {};
        popupManager.adopt(this);
        this.options(options);
        this._overlay = new Overlay({
            onClick: this.destroy.bind(this),
        });

        this.$el = $(document.createElement('div'));
        this.$el.attr('class',
            ['b-popup', 'b-panel'].concat(
                [this.options('mode') == 'hideViewportScrollbars'
                    ? 'position-static'
                    : 'position-fixed'],
                this.options('class') instanceof Array
                    ? this.options('class')
                    : [this.options('class')])
            .join(' '));
        this.$el.css('visibility', 'hidden');
        this.$el.html(_.template(
            '<div class="header-place"></div>'
            + '<div class="popup-content">'
                + this.options('content')
            + '</div>'
            + '<div class="buttons-place"></div>'
        )(Object.assign({
            options: this.options(),
        }, this.options('templateVars'))));

        new Header($('.header-place', this.$el), {
            title: this.options('title'),
            onCloseClick: this.destroy.bind(this),
        });

        if (this.options('buttons')) {
            this._buttons = new Buttons($('.buttons-place', this.$el),
                this.options('buttons'));
        }

        this._popupWrapper = new PopupWrapper(this.$el, {
            mode: this.options('mode'),
            scrollbars: (this.options('scrollbarState') || (() => {}))(),
        });

        common.waitForImages(this.$el).then(() => {
            (this.options('beforeShow') || (() => {}))();
            this.updateExtents('popupShow');
            this.$el.css('visibility', 'visible');

            this._textareaResizeEventHandler = textarea => {
                if (this.$el.has(textarea))
                    this.updateExtents('popupResize');
            };
            common.onTextareaResize(this._textareaResizeEventHandler);

            bean.on(this.$el[0], 'click', e => {
                this._popupWrapper.popupClicked(true);
            });
            this._popupWrapper.options({
                onClick: this.destroy.bind(this),
            });

            this._shown = true;
            this.options('afterShow').forEach(callback => callback());
        });
    }

    updateExtents(event) {
        if (this.options('mode') == 'hideViewportScrollbars') {
            this._popupWrapper.updateExtents();
        } else {
            const hadPositionAbsolute = this.$el.hasClass('position-absolute');

            const minClientHeight = parseInt(frontEndVars['popup-min-margin'])
                + this.$el[0].offsetHeight
                + parseInt(frontEndVars['popup-min-margin']);

            const minClientWidth = parseInt(frontEndVars['popup-min-margin'])
                + this.$el[0].offsetWidth
                + parseInt(frontEndVars['popup-min-margin']);

            const willHavePositionAbsolute =
                document.documentElement.clientWidth < minClientWidth
                || document.documentElement.clientHeight < minClientHeight;

            if ( ! (hadPositionAbsolute && willHavePositionAbsolute)) {
                let top = Math.round((
                    document.documentElement.clientHeight - this.$el[0].offsetHeight
                ) / 3);
                if (top < parseInt(frontEndVars['popup-min-margin']))
                    top = parseInt(frontEndVars['popup-min-margin']);
                if (willHavePositionAbsolute)
                    top = this.options('pageYOffset')() + top;
                this.$el.css('top', top + 'px');

                let left = Math.round((
                    document.documentElement.clientWidth - this.$el[0].offsetWidth
                ) / 2);
                if (left < parseInt(frontEndVars['popup-min-margin']))
                    left = parseInt(frontEndVars['popup-min-margin']);
                if (willHavePositionAbsolute)
                    left = this.options('pageXOffset')() + left;
                this.$el.css('left', left + 'px');
            }
            const method = willHavePositionAbsolute ? 'addClass' : 'removeClass';
            this.$el[method]('position-absolute');
        }
        if (this.options('onUpdateExtents'))
            this.options('onUpdateExtents')(event);
    }

    onEnter() {
        this._buttons.press('main-button');
        return false;
    }

    destroy() {
        if (this.options('onDestroy')) {
            const r = this.options('onDestroy')();
            if (r == false)
                return false;
        }
        this.options('beforeDestroy') && this.options('beforeDestroy')();
        common.offTextareaResize(this._textareaResizeEventHandler);
        this._popupWrapper.destroy();
        this._overlay.destroy();
        this._shown = false;
        this.options('afterDestroy') && this.options('afterDestroy')();
    }


    options(options) {
        if (options != null && typeof options != 'string') {
            const afterShow = (this.options('afterShow') || [])
                .concat(options['afterShow'] || []);
            Object.assign(this._options, options, {afterShow: afterShow});
        }
        return options && typeof options == 'string'
            ? this._options[options]
            : this._options;
    }

    getBoundingClientRect() {
        return this.$el[0].getBoundingClientRect();
    }

    shown() {
        return this._shown;
    }
}
