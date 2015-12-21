console.time('tree');

// TODO - Return the entire HTML for that depth.  
var map = {};
function getData(depth, width) {

    var color,
        left,
        nextWidth,
        right,
        style;

    if (!map[depth]) {

        color = 'rgba(' + [0, Math.floor(depth * 25), 100, (1 - depth / 40)].join(',') + ');';
        nextWidth = Math.sqrt(2 * Math.pow(width / 2, 2));
        style = 'width: ' + nextWidth + 'px;height: ' + nextWidth + 'px;background-color: ' + color;
        left = $('<div class="block left" style="' + style + '"></div>');
        right = $('<div class="block right" style="' + style + '"></div>');

        map[depth] = {
            left: left,
            nextWidth: nextWidth,
            right: right
        };
    }

    return map[depth];
}

function drawBlock(parent, width, depth) {
    var data  = getData(depth, width),
        left  = data.left.clone(),
        right = data.right.clone();

    parent.append(left);
    parent.append(right);

    if (depth > 0) {
        drawBlock(left, data.nextWidth, depth - 1);
        drawBlock(right, data.nextWidth, depth - 1);
    }

}

// TODO - Append to DOM once it's completely built out
drawBlock($('#root'), 100, 10);
console.timeEnd('tree');
