## README (billboard-search)

Search billboard records according to artist name and song name.

Backend has changed to elasticsearch. Make sure you have elasticsearch installed.


1. Direct to the root folder of your elastic search. Type:
```r
elasticesarch
```

This command starts the elasticsearch service at localhost:9200, which is the default port of the service. If needed, you could configure the host in app.js in server folder.

2. Database source: https://www.kaggle.com/rakannimer/billboard-lyrics
Import the data from the db folder by running 
```r
npm import 
```
at the project root folder or
```r
node data.js
```

at the db folder.

3. At root folder, type
```r
npm start
```

---

More details of this project is on **masters branch**.

### Contributor
* [Shangting Li](https://github.com/shangtingli)
