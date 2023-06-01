const crypto = require("crypto");
const { MAX_PARTITION_KEY_LENGTH } = require("./constants");

const getValueWithValidLength = (value, maxLength = MAX_PARTITION_KEY_LENGTH) => {
    if(value.length <= maxLength) {
        return value; 
    }
    return getCryptoHashValueForData(value);
}

const getCryptoHashValueForData = (data = '') => {
    return crypto.createHash("sha3-512").update(data).digest("hex");
}

module.exports = {
    getValueWithValidLength,
    getCryptoHashValueForData
};