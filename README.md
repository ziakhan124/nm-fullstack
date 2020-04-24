## Intro

Its a full-stack responsive (phone, tablet, desktop) web application that allows the user to view list of movies. The top of the page have a search input field and below would be a list of movies in response to the input by the user. 

## Flow

As soon as user  start typing first letter in the search input field the movies list appeared accordingly.
The list of movies are sorted alphabetically by movie title at server side. That are AJAX pulled from a backend service for every key stroke pressed by user  and should ultimately be pulled from an open public API which acts as a Live search.

## Description

A  full-stack responsive web application that allows users to get a sorted list of movies that contain user enterered'matching alphabets in their title.

The back-end is a traditional Node/Express RESTful API to fetch a set of movies from the https://api.themoviedb.org

## Local Usage Instructions

Install dependencies:

```bash
npm install express --save
npm install request --save
npm install dotenv --save
```

>NOTE: A valid TMDB API key is required to run the application locally. The server looks for this in a root-level `.env` file. For example:
>
> `TMDB_API_KEY=yourkeyhere`

Start app:

```bash
node app.js
```

Open app on ``` localhost:8081```
