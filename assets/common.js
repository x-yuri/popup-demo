import _ from 'lodash';
import Promise from 'bluebird';
import qs from 'qs';

import bean from './bean';

export function waitForImages(el) {
    const images = document.querySelectorAll('img');
    return Promise.all(_.compact(_.map(images, img => {
        if (img.complete) {
            return;
        } else
            return new Promise((resolve, reject) => {
                img.addEventListener('load', () => {
                    resolve();
                });
            });
    })));
}


let callbacks = []
let textarea;

function mousedownEventHandler(e) {
    if (e.target.tagName == 'TEXTAREA')
        textarea = e.target;
}

function mouseupEventHandler(e) {
    if (textarea) {
        callbacks.forEach(callback => {
            callback(textarea)
        });
    }
    textarea = null;
}

export function onTextareaResize(callback) {
    if ( ! callbacks.length) {
        bean.on(window, 'mousedown', mousedownEventHandler);
        bean.on(window, 'mouseup', mouseupEventHandler);
    }
    callbacks.push(callback);
}

export function offTextareaResize(callback) {
    callbacks = callbacks.filter(c => c != callback);
    if ( ! callbacks.length) {
        bean.off(window, 'mousedown', mousedownEventHandler);
        bean.off(window, 'mouseup', mouseupEventHandler);
    }
}
