import qwery from 'qwery';
import bonzo from 'bonzo';
import T from 'traversty';

bonzo.setQueryEngine(qwery);

export default function $(selector, opt_root) {
    return bonzo(qwery(selector, opt_root));
};

bonzo.aug({
    has: function(el) {
        return T(this).has(el).length;
    },


    parent: function(sel = '*') {
        return $(T(this).up(sel, 0));
    },

    selfOrParent: function(sel = '*') {
        return $(T(this).closest(sel, 0));
    },

    children: function(sel = '*') {
        return $(T(this).children(sel));
    },

    descendants: function(sel = '*') {
        return $(T(this).down(sel));
    },


    prev: function(sel = '*') {
        return $(T(this).prev(sel, 0));
    },

    next: function(sel = '*') {
        return $(T(this).next(sel, 0));
    },

    siblings: function(sel = '*') {
        return $(T(this).siblings(sel));
    },


    toArray: function() {
        return this.map(x => x);
    },
});
