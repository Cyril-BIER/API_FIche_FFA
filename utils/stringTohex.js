function strToHex(id) {
    var hexreturn = "";
    for (i = 1; i <= id.toString().length; i++) {
        hexreturn = hexreturn + (99 - id.toString().charCodeAt(i - 1));
        hexreturn = hexreturn + (id.toString().charCodeAt(i - 1));
    }
    return hexreturn;
}

module.exports = strToHex;