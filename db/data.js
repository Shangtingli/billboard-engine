const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
    hosts: [ 'http://localhost:9200']
});
// ping the client to be sure Elasticsearch is up
client.ping({
    requestTimeout: 1000,
}, function(error) {
    // at this point, eastic search is down, please check your Elasticsearch service
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

client.indices.create({
    index: 'billboard'
}, function(error, response, status) {
    if (error) {
        console.log(error);
    } else {
        console.log("created a new index", response, "with a status of", status);
    }
});
//
const bulk = [];
const bbrecords = require('./BillBoard-History.json')
//loop through each city and create and push two objects into the array in each loop
//first object sends the index and type you will be saving the data as
//second object is the data you want to index
bbrecords.forEach(record =>{
    bulk.push({index:{
            _index:"billboard",
            _type:"records_list",
        }
    })
    bulk.push(record);
});
//
// //perform bulk indexing of the data passed
client.bulk({body:bulk}, function( err, response){
    if( err ){
        console.log("Failed Bulk operation".red, err)
    } else {
        console.log("Successfully imported %s".green, bbrecords.length);
    }
});