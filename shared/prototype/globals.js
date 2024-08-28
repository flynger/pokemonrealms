const { randomInteger } = require("../shared");

// changing Array prototype methods
Array.prototype.remove = function (e) {
    return this.removeIndex(this.indexOf(e));
}
Array.prototype.removeAll = function (e) {
    const lastIndex = this.length - 1;
    for (let i = lastIndex; i >= 0; i--)
        if (this[i] === e) this.removeIndex(i);
    return this.length !== lastIndex + 1;
}
Array.prototype.removeIndex = function (i) {
    return !!this.splice(i, 1).length;
}
Array.prototype.random = function () {
    return this[randomInteger(0, this.length - 1)];
}
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = randomInteger(0, i);
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}