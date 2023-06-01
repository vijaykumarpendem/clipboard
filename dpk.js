const { getCryptoHashValueForData, getValueWithValidLength } = require('./helper');
const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require('./constants'); 

const deterministicPartitionKey = (event) => {
  if(!event) { // Base Condition
    return TRIVIAL_PARTITION_KEY;
  }

  let result;
  
  let partitionKey = event.partitionKey;
  if(partitionKey) {
    if(typeof partitionKey !== "string") {
      result = JSON.stringify(partitionKey);
    } else {
      result = partitionKey;
    }
  } else {
    result = getCryptoHashValueForData(JSON.stringify(event));
  }

  // We need partitionKey with length less than maxLength
  return getValueWithValidLength(result, MAX_PARTITION_KEY_LENGTH);
};

module.exports = {
  deterministicPartitionKey
};