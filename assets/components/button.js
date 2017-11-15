import $ from '../qwery';
import bean from '../bean';

export default class Button {
    constructor(el, type = 'button') {
        if ($(el).data('button'))
            return $(el).data('button');
        $(el).data('button', this);
        this.$el = $(el);
        this.type = type;
        this.disabled(this.$el.hasClass('disabled'));
        if ( ! this.disabled())
            this.$el.attr('tabindex', 0);
        bean.on(this.$el[0], 'click', () => bean.fire(this.$el[0], 'press'));
        bean.on(this.$el[0], 'keydown', e => {
            switch (e.key) {
            case ' ':
            case 'Enter':
                if (this._shouldFirePress(e.key)) {
                    if (e.key == ' ')
                        e.preventDefault();
                    this.$el[0].dispatchEvent(new CustomEvent('press', {
                        bubbles: true,
                        detail: {
                            key: e.key,
                        }
                    }));
                }
                break;
            }
        });
    }

    _shouldFirePress(key) {
        return [' ', 'Enter'].includes(key);
    }

    disabled(disabled) {
        if (disabled != null) {
            this.$el[disabled ? 'addClass' : 'removeClass']('disabled');
            if (disabled)
                this.$el.removeAttr('tabindex');
            else
                this.$el.attr('tabindex', 0);
            this._disabled = disabled;
        }
        return this._disabled;
    }
}
