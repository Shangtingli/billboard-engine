// TODO: Implement data.js
const csv = require('csvtojson')
const csvFilePath='.\\Data\\BillBoard-History.csv'
csv().fromFile(csvFilePath)
    .then((jsonObj)=>{
        console.log(jsonObj);
        /**
         * [
         * 	{a:"1", b:"2", c:"3"},
         * 	{a:"4", b:"5". c:"6"}
         * ]
         */
    })

// Async / await usage
const jsonArray= csv().fromFile(csvFilePath);