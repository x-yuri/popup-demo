import $ from '../qwery';
import Button from './button'

export default class LinkButton extends Button {
    _shouldFirePress(key) {
        return ['Enter'].includes(key);
    }
}
