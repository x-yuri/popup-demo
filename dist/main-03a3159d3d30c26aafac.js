webpackJsonp([1],{

/***/ "./assets/bean.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bean__ = __webpack_require__("./node_modules/bean/bean.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bean___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bean__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qwery__ = __webpack_require__("./assets/qwery.js");


__WEBPACK_IMPORTED_MODULE_0_bean___default.a.setSelectorEngine(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_bean___default.a);

/***/ }),

/***/ "./assets/common.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = waitForImages;
/* harmony export (immutable) */ __webpack_exports__["b"] = onTextareaResize;
/* harmony export (immutable) */ __webpack_exports__["a"] = offTextareaResize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__("./node_modules/bluebird/js/browser/bluebird.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qs__ = __webpack_require__("./node_modules/qs/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bean__ = __webpack_require__("./assets/bean.js");






function waitForImages(el) {
    var images = document.querySelectorAll('img');
    return __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.all(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.compact(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(images, function (img) {
        if (img.complete) {
            return;
        } else return new __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a(function (resolve, reject) {
            img.addEventListener('load', function () {
                resolve();
            });
        });
    })));
}

var callbacks = [];
var textarea = void 0;

function mousedownEventHandler(e) {
    if (e.target.tagName == 'TEXTAREA') textarea = e.target;
}

function mouseupEventHandler(e) {
    if (textarea) {
        callbacks.forEach(function (callback) {
            callback(textarea);
        });
    }
    textarea = null;
}

function onTextareaResize(callback) {
    if (!callbacks.length) {
        __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(window, 'mousedown', mousedownEventHandler);
        __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(window, 'mouseup', mouseupEventHandler);
    }
    callbacks.push(callback);
}

function offTextareaResize(callback) {
    callbacks = callbacks.filter(function (c) {
        return c != callback;
    });
    if (!callbacks.length) {
        __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].off(window, 'mousedown', mousedownEventHandler);
        __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].off(window, 'mouseup', mouseupEventHandler);
    }
}

/***/ }),

/***/ "./assets/components/button.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bean__ = __webpack_require__("./assets/bean.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Button = function () {
    function Button(el) {
        var _this = this;

        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'button';

        _classCallCheck(this, Button);

        if (Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(el).data('button')) return Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(el).data('button');
        Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(el).data('button', this);
        this.$el = Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(el);
        this.type = type;
        this.disabled(this.$el.hasClass('disabled'));
        if (!this.disabled()) this.$el.attr('tabindex', 0);
        __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].on(this.$el[0], 'click', function () {
            return __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].fire(_this.$el[0], 'press');
        });
        __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].on(this.$el[0], 'keydown', function (e) {
            switch (e.key) {
                case ' ':
                case 'Enter':
                    if (_this._shouldFirePress(e.key)) {
                        if (e.key == ' ') e.preventDefault();
                        _this.$el[0].dispatchEvent(new CustomEvent('press', {
                            bubbles: true,
                            detail: {
                                key: e.key
                            }
                        }));
                    }
                    break;
            }
        });
    }

    _createClass(Button, [{
        key: '_shouldFirePress',
        value: function _shouldFirePress(key) {
            return [' ', 'Enter'].includes(key);
        }
    }, {
        key: 'disabled',
        value: function disabled(_disabled) {
            if (_disabled != null) {
                this.$el[_disabled ? 'addClass' : 'removeClass']('disabled');
                if (_disabled) this.$el.removeAttr('tabindex');else this.$el.attr('tabindex', 0);
                this._disabled = _disabled;
            }
            return this._disabled;
        }
    }]);

    return Button;
}();

/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),

/***/ "./assets/components/link-button.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button__ = __webpack_require__("./assets/components/button.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var LinkButton = function (_Button) {
    _inherits(LinkButton, _Button);

    function LinkButton() {
        _classCallCheck(this, LinkButton);

        return _possibleConstructorReturn(this, (LinkButton.__proto__ || Object.getPrototypeOf(LinkButton)).apply(this, arguments));
    }

    _createClass(LinkButton, [{
        key: '_shouldFirePress',
        value: function _shouldFirePress(key) {
            return ['Enter'].includes(key);
        }
    }]);

    return LinkButton;
}(__WEBPACK_IMPORTED_MODULE_1__button__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (LinkButton);

/***/ }),

/***/ "./assets/components/popup/buttons.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bean__ = __webpack_require__("./assets/bean.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button__ = __webpack_require__("./assets/components/button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__link_button__ = __webpack_require__("./assets/components/link-button.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var Buttons = function () {
    function Buttons(el) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Buttons);

        this._options = options;
        this.$el = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(document.createElement('div'));
        this.$el.attr('class', 'b-popup-buttons');
        this.$el.html(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.template('<span role="<%- options["mainButton"]["role"] %>"' + ' class="main-button b-button">' + '<span class="fleck"></span>' + '<%- options["mainButton"]["label"] %>' + '</span>' + '<% if (options["auxiliaryButton"]) { %>' + '<span role="<%- options["auxiliaryButton"]["role"] %>"' + ' class="auxiliary-button b-button gray">' + '<%- options["auxiliaryButton"]["label"] %>' + '</span>' + '<% } %>')({ options: this._options }));
        Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(el).replaceWith(this.$el);

        this.$mainButton = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])('.main-button', this.$el);
        this.$auxiliaryButton = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])('.auxiliary-button', this.$el);
        var mainButton = new __WEBPACK_IMPORTED_MODULE_3__button__["a" /* default */](this.$mainButton);
        var auxiliaryButton = this.$auxiliaryButton.length ? new __WEBPACK_IMPORTED_MODULE_3__button__["a" /* default */](this.$auxiliaryButton) : null;

        __WEBPACK_IMPORTED_MODULE_2__bean__["a" /* default */].on(this.$mainButton[0], 'press', this._options['mainButton']['onPress']);
        if (this.$auxiliaryButton.length) __WEBPACK_IMPORTED_MODULE_2__bean__["a" /* default */].on(this.$auxiliaryButton[0], 'press', this._options['auxiliaryButton']['onPress']);
    }

    _createClass(Buttons, [{
        key: 'press',
        value: function press(button) {
            var $button = button == 'main-button' ? this.$mainButton : this.$auxiliaryButton;
            __WEBPACK_IMPORTED_MODULE_2__bean__["a" /* default */].fire($button[0], 'press');
        }
    }]);

    return Buttons;
}();

/* harmony default export */ __webpack_exports__["a"] = (Buttons);

/***/ }),

/***/ "./assets/components/popup/header.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bean__ = __webpack_require__("./assets/bean.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button__ = __webpack_require__("./assets/components/button.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var Header = function Header(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Header);

    this._options = options;
    this.$el = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(document.createElement('div'));
    this.$el.attr('class', 'b-popup-header');
    this.$el.html(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.template('<span role="button" class="close-button">&#x00d7;</span>' + '<div class="title">' + '<%- options["title"] %>' + '</div>')({ options: this._options }));
    Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(el).replaceWith(this.$el);
    var $closeButton = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])('.close-button', this.$el);
    new __WEBPACK_IMPORTED_MODULE_3__button__["a" /* default */]($closeButton);

    __WEBPACK_IMPORTED_MODULE_2__bean__["a" /* default */].on($closeButton[0], 'press', this._options['onCloseClick']);
};

/* harmony default export */ __webpack_exports__["a"] = (Header);

/***/ }),

/***/ "./assets/components/popup/manager.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bean__ = __webpack_require__("./assets/bean.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewport__ = __webpack_require__("./assets/components/popup/viewport.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popup__ = __webpack_require__("./assets/components/popup/popup.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var Manager = function () {
    function Manager() {
        _classCallCheck(this, Manager);

        this._mode = 'hideViewportScrollbars';
        if (this.mode() == 'hideViewportScrollbars') this._viewport = new __WEBPACK_IMPORTED_MODULE_2__viewport__["a" /* default */]();
    }

    _createClass(Manager, [{
        key: 'adopt',
        value: function adopt(popup) {
            var _this = this;

            if (this.mode() == 'hideViewportScrollbars') this._viewport.hideScrollbars();
            this._popup = popup;
            this._popup.options({
                mode: this.mode(),
                pageXOffset: this.pageXOffset.bind(this),
                pageYOffset: this.pageYOffset.bind(this),
                scrollbarState: this._viewport ? this._viewport.scrollbarState.bind(this._viewport) : null,
                afterShow: function afterShow() {
                    _this._keydownEventHandler = _this._keydownEventHandler.bind(_this);
                    __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].on(window, 'keydown', _this._keydownEventHandler);
                    _this._resizeEventHandler = _this._resizeEventHandler.bind(_this);
                    __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].on(window, 'resize', _this._resizeEventHandler);
                    __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].fire(popupManager, 'afterShow');
                },
                onUpdateExtents: function onUpdateExtents(event) {
                    if (event != 'windowResize') __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].fire(popupManager, 'updateExtents', event);
                },
                beforeDestroy: function beforeDestroy() {
                    __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].fire(popupManager, 'beforeDestroy');
                    __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].off(window, 'keydown', _this._keydownEventHandler);
                    __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].off(window, 'resize', _this._resizeEventHandler);
                },
                afterDestroy: function afterDestroy() {
                    _this._popup = null;
                    if (_this.mode() == 'hideViewportScrollbars') _this._viewport.showScrollbars();
                    __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].fire(popupManager, 'afterDestroy');
                }
            });
        }
    }, {
        key: '_keydownEventHandler',
        value: function _keydownEventHandler(e) {
            if (!this._popup) return;
            switch (e.key) {
                case 'Enter':
                    if (this.enterHasBeenHandled()) {
                        this.enterHasBeenHandled(false);
                        break;
                    }
                    if (e.target.tagName == 'TEXTAREA') break;
                    if (this._popup.onEnter() == false) break;
                    this._popup.destroy();
                    break;

                case 'Escape':
                    this._popup.destroy();
                    break;
            }
        }
    }, {
        key: 'enterHasBeenHandled',
        value: function enterHasBeenHandled(_enterHasBeenHandled) {
            if (_enterHasBeenHandled != null) this._enterHasBeenHandled = _enterHasBeenHandled;
            return this._enterHasBeenHandled;
        }
    }, {
        key: '_resizeEventHandler',
        value: function _resizeEventHandler() {
            if (this.mode() == 'hideViewportScrollbars') this._viewport.updateExtents();
            this._popup.updateExtents('windowResize');
            __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].fire(popupManager, 'updateExtents', 'windowResize');
        }
    }, {
        key: 'pageXOffset',
        value: function pageXOffset() {
            return this.mode() == 'hideViewportScrollbars' ? this._viewport.pageXOffset() : window.pageXOffset;
        }
    }, {
        key: 'pageYOffset',
        value: function pageYOffset() {
            return this.mode() == 'hideViewportScrollbars' ? this._viewport.pageYOffset() : window.pageYOffset;
        }
    }, {
        key: 'viewportClientHeight',
        value: function viewportClientHeight() {
            return this.mode() == 'hideViewportScrollbars' ? this._viewport.clientHeight() : document.documentElement.clientHeight;
        }
    }, {
        key: 'popupShown',
        value: function popupShown() {
            return this._popup && this._popup.shown();
        }
    }, {
        key: 'popupBoundingClientRect',
        value: function popupBoundingClientRect() {
            return this._popup && this._popup.getBoundingClientRect();
        }
    }, {
        key: 'mode',
        value: function mode() {
            return this._mode;
        }
    }]);

    return Manager;
}();

var popupManager = new Manager();
/* harmony default export */ __webpack_exports__["a"] = (popupManager);

/***/ }),

/***/ "./assets/components/popup/overlay.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bean__ = __webpack_require__("./assets/bean.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Overlay = function () {
    function Overlay() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Overlay);

        this._options = options;
        this.$el = Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(document.createElement('div'));
        this.$el.attr('class', 'b-popup-overlay');
        document.body.appendChild(this.$el[0]);
        __WEBPACK_IMPORTED_MODULE_1__bean__["a" /* default */].on(this.$el[0], 'click', this._options['onClick']);
    }

    _createClass(Overlay, [{
        key: 'destroy',
        value: function destroy() {
            this.$el.remove();
        }
    }]);

    return Overlay;
}();

/* harmony default export */ __webpack_exports__["a"] = (Overlay);

/***/ }),

/***/ "./assets/components/popup/popup.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__front_end_vars__ = __webpack_require__("./assets/front-end-vars.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__("./assets/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bean__ = __webpack_require__("./assets/bean.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay__ = __webpack_require__("./assets/components/popup/overlay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wrapper__ = __webpack_require__("./assets/components/popup/wrapper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manager__ = __webpack_require__("./assets/components/popup/manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header__ = __webpack_require__("./assets/components/popup/header.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__buttons__ = __webpack_require__("./assets/components/popup/buttons.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













var Popup = function () {
    function Popup() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Popup);

        this._options = {};
        __WEBPACK_IMPORTED_MODULE_7__manager__["a" /* default */].adopt(this);
        this.options(options);
        this._overlay = new __WEBPACK_IMPORTED_MODULE_5__overlay__["a" /* default */]({
            onClick: this.destroy.bind(this)
        });

        this.$el = Object(__WEBPACK_IMPORTED_MODULE_3__qwery__["a" /* default */])(document.createElement('div'));
        this.$el.attr('class', ['b-popup', 'b-panel'].concat([this.options('mode') == 'hideViewportScrollbars' ? 'position-static' : 'position-fixed'], this.options('class') instanceof Array ? this.options('class') : [this.options('class')]).join(' '));
        this.$el.css('visibility', 'hidden');
        this.$el.html(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.template('<div class="header-place"></div>' + '<div class="popup-content">' + this.options('content') + '</div>' + '<div class="buttons-place"></div>')(Object.assign({
            options: this.options()
        }, this.options('templateVars'))));

        new __WEBPACK_IMPORTED_MODULE_8__header__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_3__qwery__["a" /* default */])('.header-place', this.$el), {
            title: this.options('title'),
            onCloseClick: this.destroy.bind(this)
        });

        if (this.options('buttons')) {
            this._buttons = new __WEBPACK_IMPORTED_MODULE_9__buttons__["a" /* default */](Object(__WEBPACK_IMPORTED_MODULE_3__qwery__["a" /* default */])('.buttons-place', this.$el), this.options('buttons'));
        }

        this._popupWrapper = new __WEBPACK_IMPORTED_MODULE_6__wrapper__["a" /* default */](this.$el, {
            mode: this.options('mode'),
            scrollbars: (this.options('scrollbarState') || function () {})()
        });

        __WEBPACK_IMPORTED_MODULE_2__common__["c" /* waitForImages */](this.$el).then(function () {
            (_this.options('beforeShow') || function () {})();
            _this.updateExtents('popupShow');
            _this.$el.css('visibility', 'visible');

            _this._textareaResizeEventHandler = function (textarea) {
                if (_this.$el.has(textarea)) _this.updateExtents('popupResize');
            };
            __WEBPACK_IMPORTED_MODULE_2__common__["b" /* onTextareaResize */](_this._textareaResizeEventHandler);

            __WEBPACK_IMPORTED_MODULE_4__bean__["a" /* default */].on(_this.$el[0], 'click', function (e) {
                _this._popupWrapper.popupClicked(true);
            });
            _this._popupWrapper.options({
                onClick: _this.destroy.bind(_this)
            });

            _this._shown = true;
            _this.options('afterShow').forEach(function (callback) {
                return callback();
            });
        });
    }

    _createClass(Popup, [{
        key: 'updateExtents',
        value: function updateExtents(event) {
            if (this.options('mode') == 'hideViewportScrollbars') {
                this._popupWrapper.updateExtents();
            } else {
                var hadPositionAbsolute = this.$el.hasClass('position-absolute');

                var minClientHeight = parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin']) + this.$el[0].offsetHeight + parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin']);

                var minClientWidth = parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin']) + this.$el[0].offsetWidth + parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin']);

                var willHavePositionAbsolute = document.documentElement.clientWidth < minClientWidth || document.documentElement.clientHeight < minClientHeight;

                if (!(hadPositionAbsolute && willHavePositionAbsolute)) {
                    var top = Math.round((document.documentElement.clientHeight - this.$el[0].offsetHeight) / 3);
                    if (top < parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin'])) top = parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin']);
                    if (willHavePositionAbsolute) top = this.options('pageYOffset')() + top;
                    this.$el.css('top', top + 'px');

                    var left = Math.round((document.documentElement.clientWidth - this.$el[0].offsetWidth) / 2);
                    if (left < parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin'])) left = parseInt(__WEBPACK_IMPORTED_MODULE_1__front_end_vars__["a" /* default */]['popup-min-margin']);
                    if (willHavePositionAbsolute) left = this.options('pageXOffset')() + left;
                    this.$el.css('left', left + 'px');
                }
                var method = willHavePositionAbsolute ? 'addClass' : 'removeClass';
                this.$el[method]('position-absolute');
            }
            if (this.options('onUpdateExtents')) this.options('onUpdateExtents')(event);
        }
    }, {
        key: 'onEnter',
        value: function onEnter() {
            this._buttons.press('main-button');
            return false;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.options('onDestroy')) {
                var r = this.options('onDestroy')();
                if (r == false) return false;
            }
            this.options('beforeDestroy') && this.options('beforeDestroy')();
            __WEBPACK_IMPORTED_MODULE_2__common__["a" /* offTextareaResize */](this._textareaResizeEventHandler);
            this._popupWrapper.destroy();
            this._overlay.destroy();
            this._shown = false;
            this.options('afterDestroy') && this.options('afterDestroy')();
        }
    }, {
        key: 'options',
        value: function options(_options) {
            if (_options != null && typeof _options != 'string') {
                var afterShow = (this.options('afterShow') || []).concat(_options['afterShow'] || []);
                Object.assign(this._options, _options, { afterShow: afterShow });
            }
            return _options && typeof _options == 'string' ? this._options[_options] : this._options;
        }
    }, {
        key: 'getBoundingClientRect',
        value: function getBoundingClientRect() {
            return this.$el[0].getBoundingClientRect();
        }
    }, {
        key: 'shown',
        value: function shown() {
            return this._shown;
        }
    }]);

    return Popup;
}();

/* harmony default export */ __webpack_exports__["a"] = (Popup);

/***/ }),

/***/ "./assets/components/popup/viewport.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bean__ = __webpack_require__("./assets/bean.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Viewport = function () {
    function Viewport() {
        _classCallCheck(this, Viewport);

        this._shown = true;
        this.$siteInnerContainer = Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(document.createElement('div'));
        this.$siteInnerContainer.attr('class', 'site-inner-container');
        while (document.body.childNodes.length) {
            this.$siteInnerContainer[0].appendChild(document.body.childNodes[0]);
        }
        this.$siteOuterContainer = Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(document.createElement('div'));
        this.$siteOuterContainer.attr('class', 'site-outer-container');
        this.$siteOuterContainer.append(this.$siteInnerContainer);
        document.body.appendChild(this.$siteOuterContainer[0]);
    }

    _createClass(Viewport, [{
        key: 'showScrollbars',
        value: function showScrollbars() {
            this.$siteInnerContainer.css('width', '');
            this.$siteInnerContainer.css('height', '');
            this.$siteInnerContainer.css('margin-left', '');
            this.$siteInnerContainer.css('margin-top', '');
            this.$siteOuterContainer.css('width', '');
            this.$siteOuterContainer.css('height', '');
            Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(document.body).css('min-width', '');
            Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(document.body).css('overflow-y', '');
            window.scroll(this.pageXOffset(), this.pageYOffset());
            this._shown = true;
        }
    }, {
        key: 'hideScrollbars',
        value: function hideScrollbars() {
            this._vertScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            this._horzScrollbarHeight = window.innerHeight - document.documentElement.clientHeight;
            this._siteWidth = document.body.offsetWidth;
            this._siteHeight = document.body.offsetHeight;
            this._pageXOffset = window.pageXOffset;
            this._pageYOffset = window.pageYOffset;
            Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(document.body).css('min-width', 'auto');
            Object(__WEBPACK_IMPORTED_MODULE_0__qwery__["a" /* default */])(document.body).css('overflow-y', 'auto');
            this.$siteInnerContainer.css('margin-left', -this._pageXOffset + 'px');
            this.$siteInnerContainer.css('margin-top', -this._pageYOffset + 'px');
            this._shown = false;
            this.updateExtents();
        }
    }, {
        key: 'updateExtents',
        value: function updateExtents() {
            this.$siteOuterContainer.css('width', window.innerWidth - this._vertScrollbarWidth + 'px');
            this.$siteOuterContainer.css('height', window.innerHeight - this._horzScrollbarHeight + 'px');
            if (this.$siteInnerContainer[0].style.width && this.$siteOuterContainer[0].offsetWidth > this._siteWidth - this.pageXOffset()) this.$siteInnerContainer.css('width', '');else if (!this.$siteInnerContainer[0].style.width && this.$siteOuterContainer[0].offsetWidth < this._siteWidth - this.pageXOffset()) this.$siteInnerContainer.css('width', this._siteWidth + 'px');
            if (this.$siteInnerContainer[0].style.height && this.$siteOuterContainer[0].offsetHeight > this._siteHeight - this.pageYOffset()) this.$siteInnerContainer.css('height', '');else if (!this.$siteInnerContainer[0].style.height && this.$siteOuterContainer[0].offsetHeight < this._siteHeight - this.pageYOffset()) this.$siteInnerContainer.css('height', this._siteHeight + 'px');
        }
    }, {
        key: 'scrollbarState',
        value: function scrollbarState() {
            return this.shown() ? { vert: window.innerHeight > document.documentElement.clientHeight,
                horz: window.innerWidth > document.documentElement.clientWidth } : { vert: this._vertScrollbarWidth > 0, horz: this._horzScrollbarHeight > 0 };
        }
    }, {
        key: 'pageXOffset',
        value: function pageXOffset() {
            return this.shown() ? window.pageXOffset : this._pageXOffset;
        }
    }, {
        key: 'pageYOffset',
        value: function pageYOffset() {
            return this.shown() ? window.pageYOffset : this._pageYOffset;
        }
    }, {
        key: 'clientHeight',
        value: function clientHeight() {
            return this.shown() ? document.documentElement.clientHeight : this.$siteOuterContainer[0].offsetHeight;
        }
    }, {
        key: 'shown',
        value: function shown() {
            return this._shown;
        }
    }]);

    return Viewport;
}();

/* harmony default export */ __webpack_exports__["a"] = (Viewport);

/***/ }),

/***/ "./assets/components/popup/wrapper.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__front_end_vars__ = __webpack_require__("./assets/front-end-vars.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bean__ = __webpack_require__("./assets/bean.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Wrapper = function () {
    function Wrapper(popup) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Wrapper);

        this.$popup = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(popup);
        this._options = options;
        if (this.options('mode') == 'hideViewportScrollbars') {
            this.$el = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(document.createElement('div'));
            this.$el.attr('class', 'popup-wrapper');
            if (this.options('scrollbars')['vert']) this.$el.css('overflow-y', 'scroll');
            if (this.options('scrollbars')['horz']) this.$el.css('overflow-x', 'scroll');

            var $popupWrapper2 = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(document.createElement('table'));
            $popupWrapper2.attr('class', 'popup-wrapper-2');

            var row = $popupWrapper2[0].insertRow();

            var $popupWrapper3 = Object(__WEBPACK_IMPORTED_MODULE_1__qwery__["a" /* default */])(row.insertCell());
            $popupWrapper3.attr('class', 'popup-wrapper-3');

            this.$el.append($popupWrapper2);
            $popupWrapper3.append(this.$popup);
            document.body.appendChild(this.$el[0]);

            __WEBPACK_IMPORTED_MODULE_2__bean__["a" /* default */].on(this.$el[0], 'click', function () {
                if (!_this.popupClicked()) _this.options('onClick')();
                _this.popupClicked(false);
            });
        } else {
            document.body.appendChild(this.$popup[0]);
        }
    }

    _createClass(Wrapper, [{
        key: 'popupClicked',
        value: function popupClicked(_popupClicked) {
            if (_popupClicked != null) this._popupClicked = _popupClicked;
            return this._popupClicked;
        }
    }, {
        key: 'updateExtents',
        value: function updateExtents() {
            if (this.options('mode') == 'hideViewportScrollbars') {
                var paddingTop = (this.$el[0].clientHeight - this.$popup[0].offsetHeight) / 3 - parseInt(__WEBPACK_IMPORTED_MODULE_0__front_end_vars__["a" /* default */]['popup-min-margin']);
                if (paddingTop < 0) paddingTop = 0;
                this.$el.css('padding-top', paddingTop + 'px');
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.options('mode') == 'hideViewportScrollbars') this.$el.remove();else this.$popup.remove();
        }
    }, {
        key: 'options',
        value: function options(_options) {
            if (_options != null && typeof _options != 'string') Object.assign(this._options, _options);
            return _options && typeof _options == 'string' ? this._options[_options] : this._options;
        }
    }]);

    return Wrapper;
}();

/* harmony default export */ __webpack_exports__["a"] = (Wrapper);

/***/ }),

/***/ "./assets/front-end-vars.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (Object.assign({}, {
    'popup-min-margin': '20px'
}));

/***/ }),

/***/ "./assets/index.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./assets/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css__ = __webpack_require__("./assets/index.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__("./assets/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qwery__ = __webpack_require__("./assets/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bean__ = __webpack_require__("./assets/bean.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_popup_manager__ = __webpack_require__("./assets/components/popup/manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_popup_popup__ = __webpack_require__("./assets/components/popup/popup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_link_button__ = __webpack_require__("./assets/components/link-button.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var $basketPopupLink = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('.basket-popup-link');
var $textareaPopupLink = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('.textarea-popup-link');
var $allButFooter = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('.all-but-footer');
var $contentTextarea = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('#content-textarea');
var $footer = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('footer');

var BasketPopup = function (_Popup) {
    _inherits(BasketPopup, _Popup);

    function BasketPopup() {
        _classCallCheck(this, BasketPopup);

        var _this = _possibleConstructorReturn(this, (BasketPopup.__proto__ || Object.getPrototypeOf(BasketPopup)).call(this, {
            class: 'b-basket-popup',
            title: 'Basket',
            content: '<table>' + '<tr><td><span class="delete-button">&#x00d7;</span>' + '<td><img src="http://via.placeholder.com/50x50">' + '<td><a href="#">Item 1</a>' + '<tr><td><span class="delete-button">&#x00d7;</span>' + '<td><img src="http://via.placeholder.com/50x50">' + '<td><a href="#">Item 2</a>' + '</table>',
            buttons: {
                mainButton: {
                    role: 'button',
                    label: 'Place Order',
                    onPress: function onPress() {
                        return _this.destroy();
                    }
                },
                auxiliaryButton: {
                    role: 'button',
                    label: 'Cancel',
                    onPress: function onPress() {
                        return _this.destroy();
                    }
                }
            },
            afterShow: function afterShow() {
                Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('.popup-content tr a', _this.$el)[0].focus();
            }
        }));

        Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('.popup-content .delete-button', _this.$el).each(function (deleteButton) {
            new __WEBPACK_IMPORTED_MODULE_6__components_link_button__["a" /* default */](deleteButton);
        });
        var $popupContent = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('.popup-content', _this.$el);
        __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on($popupContent[0], 'press', '.delete-button', function (e) {
            if (e.detail.key == 'Enter') __WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */].enterHasBeenHandled(true);
            if (Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('tr', $popupContent).length > 1) Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])(e.target).parent('tr').remove();else _this.destroy();
        });
        return _this;
    }

    return BasketPopup;
}(__WEBPACK_IMPORTED_MODULE_5__components_popup_popup__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on($basketPopupLink[0], 'click', function () {
    new BasketPopup();
});

var TextareaPopup = function (_Popup2) {
    _inherits(TextareaPopup, _Popup2);

    function TextareaPopup() {
        _classCallCheck(this, TextareaPopup);

        var _this2 = _possibleConstructorReturn(this, (TextareaPopup.__proto__ || Object.getPrototypeOf(TextareaPopup)).call(this, {
            class: 'b-textarea-popup',
            title: 'Message',
            content: '<textarea id="popup-textarea"></textarea>',
            buttons: {
                mainButton: {
                    role: 'button',
                    label: 'Ok',
                    onPress: function onPress() {
                        return _this2.destroy();
                    }
                }
            }
        }));

        var $popupContent = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('.popup-content', _this2.$el);
        var $textarea = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])('textarea', $popupContent);
        initTextarea($textarea);
        return _this2;
    }

    return TextareaPopup;
}(__WEBPACK_IMPORTED_MODULE_5__components_popup_popup__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on($textareaPopupLink[0], 'click', function () {
    new TextareaPopup();
});

var positionFooter = void 0;
if (__WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */].mode() == 'hideViewportScrollbars') {
    positionFooter = function positionFooter(event) {
        // Why add pageYOffset? Consider user scrolling to the bottom of the page,
        // then opening popup, then enlarging the window vertically.
        // Footer is supposed to stick to bottom.
        var minHeight = (__WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */].popupShown() ? __WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */].pageYOffset() : 0) + __WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */].viewportClientHeight() - $footer[0].offsetHeight;
        $allButFooter.css('min-height', minHeight > 0 ? minHeight + 'px' : '');
    };
    __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(window, 'resize', function () {
        positionFooter('resize');
    });
    __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(__WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */], 'afterDestroy', function () {
        positionFooter('afterDestroy');
    });
} else {
    var updateSiteMinWidth = function updateSiteMinWidth(event) {
        document.body.style.minWidth = event == 'updateExtents' ? Math.max(minSiteWidth, window.pageXOffset + __WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */].popupBoundingClientRect()['right']) + 'px' : '';
    };

    var minSiteWidth = parseFloat(Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])(document.body).css('min-width'));

    __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(__WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */], 'updateExtents', function () {
        updateSiteMinWidth('updateExtents');
    });
    __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(__WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */], 'afterDestroy', function () {
        updateSiteMinWidth('afterDestroy');
    });

    positionFooter = function positionFooter(event) {
        var minHeight = event == 'updateExtents' ? Math.max(document.documentElement.clientHeight, window.pageYOffset + __WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */].popupBoundingClientRect()['bottom']) - $footer[0].offsetHeight : document.documentElement.clientHeight - $footer[0].offsetHeight;
        $allButFooter.css('min-height', minHeight > 0 ? minHeight + 'px' : '');
    };
    __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(__WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */], 'updateExtents', function () {
        positionFooter('updateExtents');
    });
    __WEBPACK_IMPORTED_MODULE_3__bean__["a" /* default */].on(__WEBPACK_IMPORTED_MODULE_4__components_popup_manager__["a" /* default */], 'afterDestroy', function () {
        positionFooter('afterDestroy');
    });
}
positionFooter('load');
$footer.removeClass('invisible');

__WEBPACK_IMPORTED_MODULE_1__common__["b" /* onTextareaResize */](function (textarea) {
    var $textarea = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])(textarea);
    var style = window.getComputedStyle($textarea[0], null);
    localStorage.setItem('textareaExtents: ' + textarea.id, JSON.stringify({
        w: style.getPropertyValue('width'),
        h: style.getPropertyValue('height')
    }));
});

function initTextarea(textarea) {
    var $textarea = Object(__WEBPACK_IMPORTED_MODULE_2__qwery__["a" /* default */])(textarea);
    var extents = localStorage.getItem('textareaExtents: ' + $textarea[0].id);
    if (extents) {
        extents = JSON.parse(extents);
        $textarea.css({
            width: extents['w'],
            height: extents['h']
        });
    }
}

initTextarea($contentTextarea);
$contentTextarea.removeClass('invisible');

/***/ }),

/***/ "./assets/qwery.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = $;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qwery__ = __webpack_require__("./node_modules/qwery/qwery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qwery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qwery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bonzo__ = __webpack_require__("./node_modules/bonzo/bonzo.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bonzo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bonzo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_traversty__ = __webpack_require__("./node_modules/traversty/traversty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_traversty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_traversty__);




__WEBPACK_IMPORTED_MODULE_1_bonzo___default.a.setQueryEngine(__WEBPACK_IMPORTED_MODULE_0_qwery___default.a);

function $(selector, opt_root) {
    return __WEBPACK_IMPORTED_MODULE_1_bonzo___default()(__WEBPACK_IMPORTED_MODULE_0_qwery___default()(selector, opt_root));
};

__WEBPACK_IMPORTED_MODULE_1_bonzo___default.a.aug({
    has: function has(el) {
        return __WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).has(el).length;
    },

    parent: function parent() {
        var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        return $(__WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).up(sel, 0));
    },

    selfOrParent: function selfOrParent() {
        var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        return $(__WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).closest(sel, 0));
    },

    children: function children() {
        var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        return $(__WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).children(sel));
    },

    descendants: function descendants() {
        var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        return $(__WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).down(sel));
    },

    prev: function prev() {
        var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        return $(__WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).prev(sel, 0));
    },

    next: function next() {
        var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        return $(__WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).next(sel, 0));
    },

    siblings: function siblings() {
        var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

        return $(__WEBPACK_IMPORTED_MODULE_2_traversty___default()(this).siblings(sel));
    },

    toArray: function toArray() {
        return this.map(function (x) {
            return x;
        });
    }
});

/***/ })

},["./assets/index.js"]);
//# sourceMappingURL=main-03a3159d3d30c26aafac.js.map