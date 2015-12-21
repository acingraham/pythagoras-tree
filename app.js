console.time('tree');

// TODO - Return the entire HTML for that depth.  
var map = {};
function getData(depth) {

    var color,
        left,
        right,
        style;

    if (!map[depth]) {

        color = 'rgba(' + [0, Math.floor(depth * 25), 100, (1 - depth / 40)].join(',') + ');';
        style = 'background-color: ' + color;
        left = $('<div class="block left" style="' + style + '"></div>');
        right = $('<div class="block right" style="' + style + '"></div>');

        map[depth] = {
            left: left,
            right: right
        };
    }

    return map[depth];
}

function drawBlock(parent, depth) {
    var data  = getData(depth),
        left  = data.left.clone(),
        right = data.right.clone();

    parent.append(left);
    parent.append(right);

    if (depth > 0) {
        drawBlock(left, depth - 1);
        drawBlock(right, depth - 1);
    }

}

// TODO - Append to DOM once it's completely built out
drawBlock($('#root'), 10);
console.timeEnd('tree');
