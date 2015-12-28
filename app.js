$(function() {

    var $angle        = $('#angle'),
        $blue         = $('#blue'),
        $borderRadius = $('#borderRadius'),
        $green        = $('#green'),
        $height       = $('#height'),
        $opacity      = $('#opacity'),
        $order        = $('#order'),
        $random       = $('#random'),
        $red          = $('#red'),
        $root         = $('#root');
        $width        = $('#width');

    var maxOrder = 10;

    var sheet = (function() {
        // Create the <style> tag
        var style = document.createElement('style');

        // WebKit hack :(
        style.appendChild(document.createTextNode(''));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();

    // TODO - Use this instead of makeRandom
    function setValue($elem, value) {
        $elem.val(value).change();
    }

    function setDefaults() {
        setValue($order, 9);
        setValue($width, 80);
        setValue($height, 80);
        setValue($borderRadius, 0);
        setValue($opacity, 70);
        setValue($angle, 45);
        setValue($red, 185);
        setValue($green, 70);
        setValue($blue, 255);
    }

    function addBranches(content, childNum) {
        return '<div class="block child' + childNum + '">' + content + '</div><div class="block child' + childNum + '">' + content + '</div>';
    }

    function getHTML(order) {

        var i,
            content = '';

        for (i = order - 1; i >= 0; --i) {
            content = addBranches(content, i);
        }

        return content;
    }

    function setStyles(styles) {
        var str = '{';
        for (style in styles) {
            str += style + ':' + styles[style] + ';';
        }
        str += '}';
        sheet.insertRule('#root ' + str, sheet.rules.length);
    }

    function setOrder(order) {
        var i,
            rule;
        for (i = 0; i < order; ++i) {
            rule = '.child' + i + ' {opacity: 1;}';
            sheet.insertRule(rule, sheet.rules.length);
        }
        for (; i < maxOrder; ++i) {
            rule = '.child' + i + ' {opacity: 0;}';
            sheet.insertRule(rule, sheet.rules.length);
        }
        sheet.insertRule(rule, sheet.rules.length);
    }

    function setBorder() {
        var rule = '.block {border-radius: ' + $borderRadius.val() + '%}';
        sheet.insertRule(rule, sheet.rules.length);
    }

    function setColor() {
        var rule = '.block {background-color: rgba(' + [$red.val(), $green.val(), $blue.val(), $opacity.val() / 100].join(',') + ');}';
        sheet.insertRule(rule, sheet.rules.length);
    }

    function setAngle() {
        var angle = +($angle.val());
        var magnitude = Math.cos(Math.PI * angle / 180) * 100;
        var rule = '.block:nth-child(1) {';
        rule += 'transform: rotate(' + (-angle) + 'deg);'
        rule += 'height: ' + magnitude + '%;';
        rule += 'top: ' + (-magnitude) + '%;';
        rule += 'width: ' + magnitude + '%;';
        rule += '}';
        console.log(rule);
        sheet.insertRule(rule, sheet.rules.length);

        angle = 90 - angle;
        magnitude = Math.cos(Math.PI * angle / 180) * 100;
        rule = '.block:nth-child(2) {';
        rule += 'transform: rotate(' + angle + 'deg);'
        rule += 'height: ' + magnitude + '%;';
        rule += 'top: ' + (-magnitude) + '%;';
        rule += 'width: ' + magnitude + '%;';
        rule += '}';
        console.log(rule);
        sheet.insertRule(rule, sheet.rules.length);
    }

    function grow() {
        $root.css('height', $height.val() + 'px');
        $root.css('width', $width.val() + 'px');
        setOrder(+($order.val()));
        setBorder();
        setColor();
        setAngle();
        document.getElementById('root').innerHTML = getHTML(maxOrder);
    }

    function getRandom(min, max) {
        return Math.floor((Math.random() * (max - min + 1))) + min;
    }

    function makeRandom($elem) {
        var min = +($elem[0].min);
        var max = +($elem[0].max);
        var rand = getRandom(min, max);
        $elem.val(rand).change();
    }

    function random() {
        makeRandom($angle);
        makeRandom($red);
        makeRandom($green);
        makeRandom($blue);
        makeRandom($opacity);
        makeRandom($order);
        makeRandom($height);
        makeRandom($width);
        makeRandom($borderRadius);
    }

    $order.change(function(e) {
        setOrder(+($order.val()));
    });

    $width.change(function(e) {
        grow();
    });

    $height.change(function(e) {
        grow();
    });

    $borderRadius.change(function() {
        setBorder();
    });

    $opacity.change(function() {
        setColor();
    });

    $red.change(function() {
        setColor();
    });

    $blue.change(function() {
        setColor();
    });

    $green.change(function() {
        setColor();
    });

    $angle.change(function() {
        setAngle();
    });

    $random.click(random);

    setDefaults();
    grow();
});