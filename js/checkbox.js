window.addEvent('domready', function() {

    var checkboxes = $$('input[type=checkbox]');
    var boxes = $$('.box');

    Array.each(boxes, function(el, index) {
        el.state = false;
    });

    var toggleState = function(box) {
        if (box.state === true) {
            box.setStyle('display', 'none');
            box.state = false;
            deleteContents(box);
        }
        else {
            box.state = true;
            box.setStyle('display', 'block');
            scrollToBox(box);
        }
    };

    var scrollToBox = function(box) {
        window.scrollTo(0, box.getPosition().y);
    };

    var uncheck = function(databox) {
        $$('input[data-box=' + databox + ']')[0].set('checked', false);
    };

    var deleteContents = function(box) {
        var childs = box.getChildren('input');
        childs = childs.combine(box.getChildren('textarea'));
        Array.each(childs, function(el, index) {
            el.value = '';
        });
    };

    checkboxes.addEvent('click', function() {
        var box = $(this.get('data-box'));
        if (box) {
            toggleState(box);
        }
    });

    $$('.closebutton').addEvent('click', function() {
        var box = this.getParent();
        var boxId = box.get('id');
        toggleState(box);
        uncheck(boxId);
    });

});