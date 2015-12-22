console.time('tree');

// TODO - Return the entire HTML for that depth.  
/*
var map = {};
function getData(depth) {

    var color,
        left,
        right,
        style;

    if (!map[depth]) {

        color = 'rgba(' + [0, Math.floor(depth * 25), 100, (1 - depth / 40)].join(',') + ');';
        style = 'background-color: ' + color;
        left = $('<div class="block" style="' + style + '"></div>');
        right = $('<div class="block" style="' + style + '"></div>');

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
*/

// TODO - Append to DOM once it's completely built out
//drawBlock($('#root'), 10);

function drawHTML(content) {
    return '<div class="block">' + content + '</div><div class="block">' + content + '</div>';
}

var content = '',
    depth = 10;

// (depth - 1) because we always add the root block
for(var i = 0; i < depth - 1; i++) {
    content = drawHTML(content);
}

document.body.innerHTML = '<div class="block asdf" id="root">' + content + '</div>';

console.timeEnd('tree');
