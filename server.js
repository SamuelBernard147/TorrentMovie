const express = require('express');
const app = express();
const axios = require('axios');
const cons = require('consolidate');
const PopCorn = require('popcorn-api');
var magnetToTorrent = require('magnet-to-torrent');

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', './views')

axios.get(`https://tv-v2.api-fetch.website/movies`)
    .then(function (response) {
        var data = response.data
        global.datalength = 4
    })
    .catch(function (error) {
        console.log(error);
    });


// ------------------------------------------------ \\
// |                                              | \\
// |                     Routes                   | \\ 
// |             By hajid al akhtar               | \\
// |                                              | \\
// ------------------------------------------------ \\
// ==================================== Routes ====================================== \\

global.page = 1;



app.get('/', (req, res) => {
    res.redirect('/browse-movies')

})


app.get('/search', (req, res) => {
    // res.redirect('/browse-movies')
    PopCorn.movies.search({ query: req.query.query })
        .then(function (movies) {
            global.data = 0

            if (movies.length >= 1) {
                global.data = 1

            }
            res.render('search', { trending: movies, data: data })
            // res.send(JSON.stringify({ "status": 200, "error": null, "response": movies }));

        })
})

app.get('/next', (req, res) => {
    var page1 = page + 1
    res.redirect(`/trending/${page1}`)
})

app.get('/previous', (req, res) => {

    var page1 = page - 1
    res.redirect(`/trending/${page1}`)
})


app.get('/browse-movies', (req, res) => {

    res.render('home')

})


app.get('/trending/:page', (req, res) => {

    var page2 = Number(req.params.page)
    global.page = page2;

    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=trending&order=-1`)
        .then(function (response) {
            res.render('trending', { trending: response.data, page: global.page })
        })
        .catch(function (error) {
            console.log(error);
        });



})


app.get('/details/movie/:id', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movie/${req.params.id}`)
        .then(function (response) {
            console.log(response.data);
            res.render('details', { data: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });
})
// ==================================== Close ====================================== \\

// ------------------------------------------------ \\
// |                                              | \\
// |                     Api                      | \\ 
// |             By hajid al akhtar               | \\
// |                                              | \\
// ------------------------------------------------ \\

app.get("/api", (req, res) => {
    res.send('<h1>Bananatorrent</h1><p>by hajid al akhtar</p> <a href="/api/trending/page/1">Trending<a> <br><a href="/api/lastadded/page/1">lastadded<a> <br><a href="/api/rating/page/1">rating<a> <br><a href="/api/title/page/1">title<a> <br><a href="/api/year/page/1">year<a> ')

})
// ==================================== Page ====================================== \\
app.get('/api/trending/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=trending&order=-1`)
        .then(function (response) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));
        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/lastadded/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=last%20added&order=-1`)
        .then(function (response) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/rating/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=rating&order=-1`)
        .then(function (response) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));
        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/title/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=title&order=-1`)
        .then(function (response) {
            // console.log(response.data);
            // res.send(response.title)
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/year/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=year&order=-1`)
        .then(function (response) {
            // console.log(response.data);
            // res.send(response.title)
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})

// ==================================== Close ====================================== \\
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// ==================================== Details Movie ====================================== \\
app.get('/api/details/movies/:id', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movie/${req.params.id}`)
        .then(function (response) {
            // console.log(response.data);
            // res.send(response.title)
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})

// ==================================== Close ====================================== \\










const port = process.env.PORT || 8080

app.listen(port, () => console.log(`server jalan di ${port}`));