
let mytest = require('../main/index');

const input = [
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 02:02:58", "amount": 7.00 },
  { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:12:32", "amount": 6.50 },
  { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:13:11", "amount": 7.25 },
  { "ip": "44.44.44.44", "timestamp": "3/11/2016 02:13:54", "amount": 8.75 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 05:02:45", "amount": 11.00 },
  { "ip": "44.44.44.44", "timestamp": "3/11/2016 06:32:42", "amount": 5.00 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 06:35:12", "amount": 2.00 },
  { "ip": "11.11.11.11", "timestamp": "3/11/2016 06:45:01", "amount": 12.00 },
  { "ip": "11.11.11.11", "timestamp": "3/11/2016 06:59:59", "amount": 11.75 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 07:01:53", "amount": 1.00 },
  { "ip": "11.11.11.11", "timestamp": "3/11/2016 07:02:54", "amount": 4.50 },
  { "ip": "33.33.33.33", "timestamp": "3/11/2016 07:02:54", "amount": 15.75 },
  { "ip": "66.66.66.66", "timestamp": "3/11/2016 07:02:54", "amount": 14.25 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 07:03:15", "amount": 12.00 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 08:02:22", "amount": 3.00 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 09:41:50", "amount": 4.00 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 10:02:54", "amount": 5.00 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 11:05:35", "amount": 10.00 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 13:02:21", "amount": 6.00 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 13:02:40", "amount": 8.00 },
  { "ip": "44.44.44.44", "timestamp": "3/11/2016 13:02:55", "amount": 8.00 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 13:33:34", "amount": 8.00 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 13:42:24", "amount": 8.00 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 13:47:44", "amount": 6.25 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 14:02:54", "amount": 4.25 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 14:03:04", "amount": 5.25 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 15:12:55", "amount": 6.25 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 16:02:36", "amount": 8.00 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 16:22:11", "amount": 8.50 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 17:18:19", "amount": 11.25 },
  { "ip": "55.55.55.55", "timestamp": "3/11/2016 18:19:20", "amount": 9.00 },
  { "ip": "22.22.22.22", "timestamp": "3/11/2016 23:59:59", "amount": 9.00 }
];

const output = [
  {
    "ip": "44.44.44.44",
    "timestamp": "3/11/2016 02:13:54",
    "amount": 8.75
  },
  {
    "ip": "11.11.11.11",
    "timestamp": "3/11/2016 06:45:01",
    "amount": 12
  },
  {
    "ip": "33.33.33.33",
    "timestamp": "3/11/2016 07:02:54",
    "amount": 15.75
  },
  {
    "ip": "55.55.55.55",
    "timestamp": "3/11/2016 13:02:40",
    "amount": 8
  },
  {
    "ip": "55.55.55.55",
    "timestamp": "3/11/2016 14:03:04",
    "amount": 5.25
  },
  {
    "ip": "55.55.55.55",
    "timestamp": "3/11/2016 15:12:55",
    "amount": 6.25
  },
  {
    "ip": "55.55.55.55",
    "timestamp": "3/11/2016 16:22:11",
    "amount": 8.5
  },
  {
    "ip": "55.55.55.55",
    "timestamp": "3/11/2016 17:18:19",
    "amount": 11.25
  },
  {
    "ip": "55.55.55.55",
    "timestamp": "3/11/2016 18:19:20",
    "amount": 9
  }
];

describe("The test criteria ", function () {

  function hasRepeatedKey(_input, _repeatedKey) {
    let hasMatch = false;
    for (var index = 0; index < _input.length; ++index) {
      const obj = _input[index];
      if (obj.ip === _repeatedKey) {
        hasMatch = true;
        break;
      }
    }
    return hasMatch;
  }

  it("should pass if the output is exactly as desired criteria of filtering", function () {
    expect(mytest.getFilterOfDataBasedOnCondition(input)).toEqual(output);
  });
  
  it("should pass if there is no max(10) repeated key (IP) found", function () {
    const result = mytest.getFilterOfDataBasedOnCondition(input);
    expect(hasRepeatedKey(result, '22.22.22.22')).toBe(false);
  });

  it("should pass if only highest amount remains in the period", function () {
    const input = [
      { "ip": "22.22.22.22", "timestamp": "3/11/2016 02:02:58", "amount": 7.00 },
      { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:12:32", "amount": 6.50 },
      { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:13:11", "amount": 7.25 },
      { "ip": "44.44.44.44", "timestamp": "3/11/2016 02:13:54", "amount": 8.75 }
    ];
    const output = [
      { "ip": "44.44.44.44", "timestamp": "3/11/2016 02:13:54", "amount": 8.75 }
    ];
    expect(mytest.getFilterOfDataBasedOnCondition(input)).toEqual(output);
  });

  it("should not match if compare with the ouput of lowest amount period", function () {
    const input = [
      { "ip": "22.22.22.22", "timestamp": "3/11/2016 02:02:58", "amount": 7.00 },
      { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:12:32", "amount": 6.00 }
    ];
    const output = [
      { "ip": "44.44.44.44", "timestamp": "3/11/2016 02:13:54", "amount": 6.00 }
    ];
    expect(mytest.getFilterOfDataBasedOnCondition(input)).not.toEqual(output);
  });

  

});