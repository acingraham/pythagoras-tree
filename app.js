console.time('tree');

function addBranches(content) {
    return '<div>' + content + '</div><div>' + content + '</div>';
}

var content = '',
    order = 10;

for(var i = 0; i < order; ++i) {
    content = addBranches(content);
}

document.getElementById('root').innerHTML = content;
console.timeEnd('tree');
