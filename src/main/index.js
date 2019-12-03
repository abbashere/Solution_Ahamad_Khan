/***--- Moment library is getting used for Datetime operations ---***/ 
let moment = require('moment');

/***--- Reading data inout from fileSystem ---***/ 
let filestreams = require('fs');
let obj_data = JSON.parse(filestreams.readFileSync('src/main/clicks.json', 'utf8'));
console.log("\n----- Input data ----\n");
console.log(obj_data);

const getFilterOutMaxRepeat = (dataClicks, MAX_REPEAT_LIMIT) => {
    const reduced_data = dataClicks.reduce(function (obj, value) {
        obj[value.ip] = (obj[value.ip] || 0) + 1;
        return obj;
    }, {});
    let dataWithoutRepeat = [];
    for (let l of dataClicks) {
        if (reduced_data[l.ip] <= MAX_REPEAT_LIMIT) dataWithoutRepeat.push(l)
    };
    return dataWithoutRepeat;
}

const getDataGroupByIP = (dataWithoutRepeat) => {
    let accumulator = Array(25).fill([]) // data with accumlate value
    for (let item of dataWithoutRepeat) {
        let dtp = moment(item.timestamp, "mm/dd/yyyy hh:mm:ss");
        let element = parseInt(dtp.format("HH")) + 1;
        if (accumulator[element].length === 0) {
            accumulator[element] = {};
            accumulator[element][item.ip] = item;
            accumulator[element].val = item.amount
        } else {
            if (item.amount > accumulator[element].val) {
                accumulator[element] = {}
                accumulator[element][item.ip] = item;
                accumulator[element].val = item.amount
            } else if (item.amount == accumulator[element].val) {
                if (accumulator[element][item.ip] == 0) {
                    accumulator[element][item.ip] = item
                    if ((moment(item.timestamp)) > dtp) {
                        accumulator[element][item.ip] = item;
                    }
                }
            };
        }
    }
    return accumulator;
}

const getFinalOutput = (accumlatedData) => {
    let finalData = [];
    for (let item of accumlatedData) {
        if (item.length == 0) continue;
        const vals = Object.keys(item).map(function (key) {
            return item[key];
        });
        const value = (vals[0]);
        finalData.push(value)
    };
    return finalData;
}


function getFilterOfDataBasedOnCondition(clicks) {
    const _clicks = clicks || obj_data; // Setting default parametre 'obj_data' 
    const MAX_REPEAT_LIMIT = 10; // Set max repeat record of JSON get excluded
    const clicksAfterFilter = getFilterOutMaxRepeat(_clicks, MAX_REPEAT_LIMIT);
    const accumlatedData = getDataGroupByIP(clicksAfterFilter);
    const finalResult = getFinalOutput(accumlatedData);

    /***--- Writing result in result​set.json into main ---***/
    filestreams.writeFileSync('src/main/result​set.json', JSON.stringify(finalResult));

    /***--- returning a result so we can test it as a pure function ---***/
    return finalResult;
}

console.log("\n---Final Result, file resultset.json already create into main/resultset.json---\n")
console.log(JSON.stringify(getFilterOfDataBasedOnCondition()))

/***--- Exported it So we can test---***/
module.exports.getFilterOfDataBasedOnCondition = getFilterOfDataBasedOnCondition;




