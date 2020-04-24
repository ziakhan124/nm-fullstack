var express = require("express");
var app = express();
var router = express.Router();
var request = require("request");

var path = __dirname + '/views/';

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

app.get('/search_movie', function (req, res) {
  var movie_name = null;

  // This will loop and extract the query parm from req. header and store in movie_name variable
  // movie_name will store term user typed in search bar on client side
  for (const key in req.query) {
    movie_name = key;
  }

  // this is the url template
  const url = "https://api.themoviedb.org/3/search/movie?api_key=2a30a0486a3e545e7edf4704c9bf578d&language=en-US&query=" + movie_name + "&page=1&include_adult=false";

  //Every time user type more than  3 letters below function will execute and send request to API
  //Return response will then send it to Client 
  request.get(url, (error, response, body) => {
    // The response got from API will get parse in to json variable
    let json = JSON.parse(body);

    var results = [];

    json.results.forEach(el => {
      results.push({ title: el.title, release_date: el.release_date, original_language: el.original_language, overview: el.overview, poster_path: el.poster_path });
    });

    // Calling sorting function
    results.sort(SortAlphabetical("title"));

    //This will check if we have any error while getting response from API if not we will send the response to client (Frontend)
    if (!error) {
      res.send(results, {
        'Content-Type': 'application/json'
      }, 200);
    } else {
      res.send(JSON.stringify(err), {
        'Content-Type': 'application/json'
      }, 404);
    }
  });
});

//sorting alphabatically
function SortAlphabetical(propertyName) {
  var sortingOrder = 1;

  if (propertyName[0] === "-") {
    sortingOrder = -1;
    propertyName = propertyName.substr(1);
  }

  return function (x, y) {
    if (sortingOrder == -1) {
      return y[propertyName].localeCompare(x[propertyName]);
    } else {
      return x[propertyName].localeCompare(y[propertyName]);
    }
  }
}

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.use("/", router);

app.listen(8081, function () {
  console.log('App listening on port 8081')
})