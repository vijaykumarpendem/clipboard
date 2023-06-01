const { deterministicPartitionKey } = require("./dpk");
const { getCryptoHashValueForData, getValueWithValidLength } = require("./helper");

describe("getValueWithValidLength", () => {
  it("Returns the input string if it's length is less than maxLength", () => {
    const input = 'vijay', maxLength = 8;
    const output = getValueWithValidLength(input, maxLength);
    expect(output).toBe(input);
  });

  it("Returns a string with value less than maxLength if it's length is greater than maxLength", () => {
    let input = '';
    for(let i = 0; i< 300; i++) {
      input += 'a';
    }
    const maxLength = 256;
    const output = getValueWithValidLength(input, maxLength);
    expect(output.length).toBeLessThanOrEqual(maxLength);
  });
});

describe("getCryptoHashValueForData", () => {
  it("Returns a hash for a given string", () => {
    const input = 'vijay';
    const output = getCryptoHashValueForData(input);
    expect(typeof output).toBe("string");
  });

  it("Returns a hash even if input is not provided as input's default value is set to empty string", () => {
    const output = getCryptoHashValueForData();
    expect(typeof output).toBe("string");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the hash value of event if no partitionKey is present", () => {
    const event = {
      sampleKey: "sampleValue"
    };
    const hashValueOfEvent = getCryptoHashValueForData(JSON.stringify(event))
    const finalOutputForEvent = getValueWithValidLength(hashValueOfEvent);

    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(finalOutputForEvent);
  });

  it("Returns hash value if partition key is string", () => {
    const event = {
      partitionKey: "vijay"
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(typeof partitionKey).toBe("string");
  });

  it("Returns hash value if partition key is not string", () => {
    const event = {
      partitionKey: {
        name: "vijay"
      }
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(typeof partitionKey).toBe("string");
  });

  // TODO: 
  // 1. Returns hash value of partition key string if it is string
  // 1. Returns hash value of JSON.stringify(partitionKey) if it is not string
});
