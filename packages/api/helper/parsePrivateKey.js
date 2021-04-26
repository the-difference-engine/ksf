'use strict';

module.exports = function parsePrivateKey(privateKey) {
    if (!privateKey || privateKey.length === 0) {
        console.log("There is no key. Only Null")
    } else {
        return privateKey.replace(/\\n/g, '\n');
    }
    
}