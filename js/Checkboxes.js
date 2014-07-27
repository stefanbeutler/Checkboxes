
var Checkboxes = new Class({

    Implements: [Options, Events],

    options: {

    },

    initialize: function(checkboxes, container, close, options) {

        //settings
        this.setOptions(options);

        this.checkboxes = $$('.' + checkboxes);
        this.container = $$('.' + container);
        this.close = $$('.' + close);

        Array.each(this.checkboxes, function(element, index) {
            element.state = false;
        });

        Array.each(this.container, function(element, index) {
            var hideElement = new Fx.Slide(element);
            hideElement.hide();
        });

        this.clickEvents();
    },

    deleteContents: function(box) {
        var children = box.getChildren('input');
        children = children.combine(box.getChildren('textarea'));
        Array.each(children, function(el, index) {
            el.value = '';
        });
    },

    scrollToBox: function(box) {
        var scroll = new Fx.SmoothScroll();
        scroll.toElement(box);
    },

    uncheck: function(databox) {
        $$('input[data-box=' + databox + ']')[0].set('checked', false);
    },

    clickEvents: function() {
        var self = this;

        this.checkboxes.addEvent('click', function() {
            var box = $(this.get('data-box'));
            if (box) {
                self.toggleState(box);
            }
        });

        if (this.close) {
            this.close.addEvent('click', function() {
                var box = this.getParent();
                var boxId = box.get('id');
                self.toggleState(box);
                self.uncheck(boxId);
            });
        }
    },

    toggleContainer: function(box, state) {
        var self = this;
        var showElement = new Fx.Slide(box);
        if (state) {
            showElement.slideIn();
            box.addClass('active');
            self.scrollToBox(box);
        }
        else {
            box.removeClass('active');
            showElement.slideOut();
        }
    },

    toggleState: function(box) {
        var self = this;
        if (box.state === true) {
            box.state = false;
            self.deleteContents(box);
            self.toggleContainer(box, false);
        }
        else {
            box.state = true;
            //self.scrollToBox(box);
            self.toggleContainer(box, true);
        }
    }

});