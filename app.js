function drawBlock(parent, width, depth) {
    var newWidth = Math.sqrt(2 * Math.pow(width / 2, 2));
    var color = 'rgba(' + [0, Math.floor(depth * 25), 100, (1 - depth / 40)].join(',') + ');';
    console.log(color);
    var style = 'width: ' + newWidth + 'px;height: ' + newWidth + 'px;background-color: ' + color;
    var left = $('<div class="block left" style="' + style + '"></div>');
    var right = $('<div class="block right" style="' + style + '"></div>');

    left.hide();
    right.hide();

    parent.append(left);
    parent.append(right);

    left.fadeIn(1000);
    right.fadeIn(1000);

    if (depth > 0) {
        setTimeout(function() {
            drawBlock(left, newWidth, depth - 1);
            drawBlock(right, newWidth, depth - 1);
        }, 500);
    }

}

// TODO - Append to DOM once it's completely built out
drawBlock($('#root'), 100, 7);