import $ from '../../qwery';
import bean from '../../bean';

export default class Viewport {
    constructor() {
        this._shown = true;
        this.$siteInnerContainer = $(document.createElement('div'));
        this.$siteInnerContainer.attr('class', 'site-inner-container');
        while (document.body.childNodes.length) {
            this.$siteInnerContainer[0].appendChild(document.body.childNodes[0]);
        }
        this.$siteOuterContainer = $(document.createElement('div'));
        this.$siteOuterContainer.attr('class', 'site-outer-container');
        this.$siteOuterContainer.append(this.$siteInnerContainer);
        document.body.appendChild(this.$siteOuterContainer[0]);
    }

    showScrollbars() {
        this.$siteInnerContainer.css('width', '');
        this.$siteInnerContainer.css('height', '');
        this.$siteInnerContainer.css('margin-left', '');
        this.$siteInnerContainer.css('margin-top', '');
        this.$siteOuterContainer.css('width', '');
        this.$siteOuterContainer.css('height', '');
        $(document.body).css('min-width', '');
        $(document.body).css('overflow-y', '');
        window.scroll(this.pageXOffset(), this.pageYOffset());
        this._shown = true;
    }

    hideScrollbars() {
        this._vertScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        this._horzScrollbarHeight = window.innerHeight - document.documentElement.clientHeight;
        this._siteWidth = document.body.offsetWidth;
        this._siteHeight = document.body.offsetHeight;
        this._pageXOffset = window.pageXOffset;
        this._pageYOffset = window.pageYOffset;
        $(document.body).css('min-width', 'auto');
        $(document.body).css('overflow-y', 'auto');
        this.$siteInnerContainer.css('margin-left', - this._pageXOffset + 'px');
        this.$siteInnerContainer.css('margin-top', - this._pageYOffset + 'px');
        this._shown = false;
        this.updateExtents();
    }

    updateExtents() {
        this.$siteOuterContainer.css('width', window.innerWidth - this._vertScrollbarWidth + 'px');
        this.$siteOuterContainer.css('height', window.innerHeight - this._horzScrollbarHeight + 'px');
        if (this.$siteInnerContainer[0].style.width
        && this.$siteOuterContainer[0].offsetWidth > this._siteWidth - this.pageXOffset())
            this.$siteInnerContainer.css('width', '');
        else if ( ! this.$siteInnerContainer[0].style.width
        && this.$siteOuterContainer[0].offsetWidth < this._siteWidth - this.pageXOffset())
            this.$siteInnerContainer.css('width', this._siteWidth + 'px');
        if (this.$siteInnerContainer[0].style.height
        && this.$siteOuterContainer[0].offsetHeight > this._siteHeight - this.pageYOffset())
            this.$siteInnerContainer.css('height', '');
        else if ( ! this.$siteInnerContainer[0].style.height
        && this.$siteOuterContainer[0].offsetHeight < this._siteHeight - this.pageYOffset())
            this.$siteInnerContainer.css('height', this._siteHeight + 'px');
    }


    scrollbarState() {
        return this.shown()
            ? {vert: window.innerHeight > document.documentElement.clientHeight,
                horz: window.innerWidth > document.documentElement.clientWidth}
            : {vert: this._vertScrollbarWidth > 0, horz: this._horzScrollbarHeight > 0};
    }

    pageXOffset() {
        return this.shown() ? window.pageXOffset : this._pageXOffset;
    }

    pageYOffset() {
        return this.shown() ? window.pageYOffset : this._pageYOffset;
    }

    clientHeight() {
        return this.shown()
            ? document.documentElement.clientHeight
            : this.$siteOuterContainer[0].offsetHeight;
    }

    shown() {
        return this._shown;
    }
}
