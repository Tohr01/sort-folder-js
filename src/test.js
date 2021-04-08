function getExtention(filename) {
    console.log(filename.split('.'));
    return filename.split('.').slice(1).join('.').toLowerCase();
}

console.log(getExtention('index.html'));
console.log(getExtention('index.html.test'));
console.log(getExtention('index'));
