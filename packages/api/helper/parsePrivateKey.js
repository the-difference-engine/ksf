module.exports = function parsePrivateKey(privateKey) {
    const pk = privateKey.replace(/\\n/g, '\n');
    return pk
}