//index.js
//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');
// instantiate an elasticsearch client
const client = new elasticsearch.Client({
    hosts: [ 'http://localhost:9200']
});
//require Express
const express = require( 'express' );
// instanciate an instance of express and hold the value in a constant called app
const app     = express();
//require the body-parser library. will be used for parsing body requests
const bodyParser = require('body-parser')
//require the path library
const path    = require( 'path' );

// ping the client to be sure Elasticsearch is up
client.ping({
    requestTimeout: 30000,
}, function(error) {
    // at this point, eastic search is down, please check your Elasticsearch service
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});


// use the bodyparser as a middleware
app.use(bodyParser.json())
// set port for the app to listen on
app.set( 'port', process.env.PORT || 3003 );
// set path to serve static files
app.use( express.static( path.join( __dirname, 'public' )));
// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res){
    res.sendFile('index.ejs', {
        root: path.join( __dirname, 'views' )
    });
})

function search(body,res){
    client.search({index:'billboard',  body:body})
        .then(results => {
            console.log("Success");
            res.send(results.hits.hits);
        })
        .catch(err=>{
            console.log(err);
            res.send([]);
        });
}

app.get('/api/getArtist',function (req, res){
    let body = {
        size: 200, from: 0, query: {match_phrase: {Artist: req.query.artist}},
        sort : [{Rank : {order : "asc"}}]
    };
    search(body,res);
})
// define the /search route that should return elastic search results
app.get('/api/getSong', function (req, res){
    let body = {
        size: 200, from: 0, query: {match_phrase: {Song: req.query.song}},
        sort : [{Rank : {order : "asc"}}]
    };
    search(body,res);

});

app.get('/api/getYear',function(req,res){
    let body = {
        size: 200, from: 0, query: {match_phrase: {Year: req.query.year}},
        sort : [{Rank : {order : "asc"}}]
    };
    search(body,res);
});

app.get('/api/getAllArtists',function(req,res){
    let body = {
        size: 0,
        aggs : {
            patterns : {
                terms : { field : "Artist.keyword",size:5000}
            }
        }
    };

    client.search({index:'billboard',  body:body})
        .then(results => {
            console.log("Success");
            res.send(results['aggregations']['patterns']['buckets']);
        })
        .catch(err=>{
            console.log(err);
            res.send([]);
        });

})
// listen on the specified port
app .listen( app.get( 'port' ), function(){
    console.log( 'Express server listening on port ' + app.get( 'port' ));
} );