import $ from '../../qwery';
import bean from '../../bean';
import Viewport from './viewport';
import Popup from './popup';

class Manager {
    constructor() {
        this._mode = 'hideViewportScrollbars';
        if (this.mode() == 'hideViewportScrollbars')
            this._viewport = new Viewport;
    }

    adopt(popup) {
        if (this.mode() == 'hideViewportScrollbars')
            this._viewport.hideScrollbars();
        this._popup = popup;
        this._popup.options({
            mode: this.mode(),
            pageXOffset: this.pageXOffset.bind(this),
            pageYOffset: this.pageYOffset.bind(this),
            scrollbarState: this._viewport ?
                this._viewport.scrollbarState.bind(this._viewport)
            : null,
            afterShow: () => {
                this._keydownEventHandler = this._keydownEventHandler.bind(this);
                bean.on(window, 'keydown', this._keydownEventHandler);
                this._resizeEventHandler = this._resizeEventHandler.bind(this);
                bean.on(window, 'resize', this._resizeEventHandler);
                bean.fire(popupManager, 'afterShow');
            },
            onUpdateExtents: event => {
                if (event != 'windowResize')
                    bean.fire(popupManager, 'updateExtents', event);
            },
            beforeDestroy: () => {
                bean.fire(popupManager, 'beforeDestroy');
                bean.off(window, 'keydown', this._keydownEventHandler);
                bean.off(window, 'resize', this._resizeEventHandler);
            },
            afterDestroy: () => {
                this._popup = null;
                if (this.mode() == 'hideViewportScrollbars')
                    this._viewport.showScrollbars();
                bean.fire(popupManager, 'afterDestroy');
            },
        });
    }


    _keydownEventHandler(e) {
        if ( ! this._popup)
            return;
        switch (e.key) {
        case 'Enter':
            if (this.enterHasBeenHandled()) {
                this.enterHasBeenHandled(false);
                break;
            }
            if (e.target.tagName == 'TEXTAREA')
                break;
            if (this._popup.onEnter() == false)
                break;
            this._popup.destroy();
            break;

        case 'Escape':
            this._popup.destroy();
            break;
        }
    }

    enterHasBeenHandled(enterHasBeenHandled) {
        if (enterHasBeenHandled != null)
            this._enterHasBeenHandled = enterHasBeenHandled;
        return this._enterHasBeenHandled;
    }

    _resizeEventHandler() {
        if (this.mode() == 'hideViewportScrollbars')
            this._viewport.updateExtents();
        this._popup.updateExtents('windowResize');
        bean.fire(popupManager, 'updateExtents', 'windowResize');
    }


    pageXOffset() {
        return this.mode() == 'hideViewportScrollbars'
            ? this._viewport.pageXOffset()
            : window.pageXOffset;
    }

    pageYOffset() {
        return this.mode() == 'hideViewportScrollbars'
            ? this._viewport.pageYOffset()
            : window.pageYOffset;
    }

    viewportClientHeight() {
        return this.mode() == 'hideViewportScrollbars'
            ? this._viewport.clientHeight()
            : document.documentElement.clientHeight;
    }


    popupShown() {
        return this._popup && this._popup.shown();
    }

    popupBoundingClientRect() {
        return this._popup && this._popup.getBoundingClientRect();
    }


    mode() {
        return this._mode;
    }
}

const popupManager = new Manager;
export default popupManager;
