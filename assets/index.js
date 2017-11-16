import './index.css';

import queryString from 'query-string';

import * as common from './common';
import $ from './qwery';
import bean from './bean';
import popupManager from './components/popup/manager';
import Popup from './components/popup/popup';
import LinkButton from './components/link-button';

const $basketPopupLink = $('.basket-popup-link');
const $textareaPopupLink = $('.textarea-popup-link');
const $modeLink = $('.mode-link');
const $allButFooter = $('.all-but-footer');
const $contentTextarea = $('#content-textarea');
const $footer = $('footer');

class BasketPopup extends Popup {
    constructor() {
        super({
            class: 'b-basket-popup',
            title: 'Basket',
            content: '<table class="b-basket-popup-content">'
                    + '<tr><td><span class="delete-button">&#x00d7;</span>'
                        + '<td><img src="http://via.placeholder.com/50x50">'
                        + '<td><a href="#">Item 1</a>'
                    + '<tr><td><span class="delete-button">&#x00d7;</span>'
                        + '<td><img src="http://via.placeholder.com/50x50">'
                        + '<td><a href="#">Item 2</a>'
                + '</table>',
            buttons: {
                mainButton: {
                    role: 'button',
                    label: 'Place Order',
                    onPress: () => this.destroy(),
                },
                auxiliaryButton: {
                    role: 'button',
                    label: 'Cancel',
                    onPress: () => this.destroy(),
                }
            },
            afterShow: () => {
                $('tr a', $popupContent)[0].focus();
            },
        });
        const $popupContent = $('.b-basket-popup-content', this.$el);
        $('.delete-button', $popupContent).each(deleteButton => {
            new LinkButton(deleteButton);
        });
        bean.on($popupContent[0], 'press', '.delete-button', e => {
            if (e.detail.key == 'Enter')
                popupManager.enterHasBeenHandled(true);
            if ($('tr', $popupContent).length > 1)
                $(e.target).parent('tr').remove();
            else
                this.destroy();
        });
    }
}
bean.on($basketPopupLink[0], 'click', () => {
    new BasketPopup();
});

class TextareaPopup extends Popup {
    constructor() {
        super({
            class: 'b-textarea-popup',
            title: 'Message',
            content: '<textarea id="popup-textarea" class="b-textarea-popup-content">'
                + '</textarea>',
            buttons: {
                mainButton: {
                    role: 'button',
                    label: 'Ok',
                    onPress: () => this.destroy(),
                },
            },
        });
        const $popupContent = $('.b-textarea-popup-content', this.$el);
        initTextarea($popupContent);
    }
}
bean.on($textareaPopupLink[0], 'click', () => {
    new TextareaPopup();
});

const otherMode = popupManager.mode() == 'hideViewportScrollbars' ? 1 : 2;
$modeLink.text('-> mode ' + otherMode);
$modeLink.attr('href', location.pathname + '?' + queryString.stringify({mode: otherMode}));
$modeLink.removeClass('invisible');

let positionFooter;
if (popupManager.mode() == 'hideViewportScrollbars') {
    positionFooter = (event) => {
        // Why add pageYOffset? Consider user scrolling to the bottom of the page,
        // then opening popup, then enlarging the window vertically.
        // Footer is supposed to stick to bottom.
        const minHeight
            = (popupManager.popupShown() ? popupManager.pageYOffset() : 0)
            + popupManager.viewportClientHeight() - $footer[0].offsetHeight;
        $allButFooter.css('min-height', minHeight > 0 ? minHeight + 'px' : '');
    };
    bean.on(window, 'resize', () => { positionFooter('resize') });
    bean.on(popupManager, 'afterDestroy', () => { positionFooter('afterDestroy') });

} else {
    const minSiteWidth = parseFloat($(document.body).css('min-width'));
    function updateSiteMinWidth(event) {
        document.body.style.minWidth = event == 'updateExtents'
            ? Math.max(
                minSiteWidth,
                window.pageXOffset + popupManager.popupBoundingClientRect()['right']
            ) + 'px'
            : '';
    }
    bean.on(popupManager, 'updateExtents', () => { updateSiteMinWidth('updateExtents') });
    bean.on(popupManager, 'afterDestroy', () => { updateSiteMinWidth('afterDestroy') });

    positionFooter = (event) => {
        const minHeight = event == 'updateExtents'
            ? Math.max(
                document.documentElement.clientHeight,
                window.pageYOffset + popupManager.popupBoundingClientRect()['bottom']
            ) - $footer[0].offsetHeight
            : document.documentElement.clientHeight - $footer[0].offsetHeight;
        $allButFooter.css('min-height', minHeight > 0 ? minHeight + 'px' : '');
    };
    bean.on(popupManager, 'updateExtents', () => { positionFooter('updateExtents') });
    bean.on(popupManager, 'afterDestroy', () => { positionFooter('afterDestroy') });
}
positionFooter('load');
$footer.removeClass('invisible');

common.onTextareaResize(textarea => {
    const $textarea = $(textarea);
    const style = window.getComputedStyle($textarea[0], null);
    localStorage.setItem('textareaExtents: ' + textarea.id, JSON.stringify({
        w: style.getPropertyValue('width'),
        h: style.getPropertyValue('height'),
    }));
});

function initTextarea(textarea) {
    const $textarea = $(textarea);
    let extents = localStorage.getItem('textareaExtents: ' + $textarea[0].id);
    if (extents) {
        extents = JSON.parse(extents);
        $textarea.css({
            width: extents['w'],
            height: extents['h'],
        });
    }
}

initTextarea($contentTextarea);
$contentTextarea.removeClass('invisible');
