module.exports = function parsePrivateKey(privateKey) {
    return privateKey.replace(/\\n/g, '\n');
}