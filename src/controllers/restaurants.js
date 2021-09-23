#!/usr/bin/node
var axios = require("axios").default;

var options = {
    method: 'GET', // method is GET
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng', // API endpoint
    params: {
        latitude: '3.43722', // latitude of location to search
        longitude: '-76.5225', // longitude of location to search
        limit: '10', // number of results to return
        currency: 'USD', // currency to return prices in
        distance: '2', // distance to search in km
        open_now: 'false', // whether to return only open restaurants
        lunit: 'km', // unit of distance
        lang: 'en_US'
    },
    headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com', // API host header
        'x-rapidapi-key': '0e91f04f86msh8bc4c4fc25e282cp190397jsn3272f9a1eb3e' // API key header
    }
};

const getRestaurants = (req, res) => {
    console.log(req.oidc.isAuthenticated()); // confirm user is authenticated
    if (req.oidc.isAuthenticated() == true) {

        axios.request(options).then(function (response) {
            console.log(response.data.data);
            res.render("restaurants.html", {
                title: "@Ricardo1470", // page title
                isAuthenticated: req.oidc.isAuthenticated(), // check if user is authenticated
                data: response.data.data, // data from API response
            });
        }).catch(function (error) {
            console.error(error);
        });

    } else {
        //res.send('no autenticado');
        res.render("logout.html", {
            title: "@Ricardo1470", // page title
            isAuthenticated: req.oidc.isAuthenticated(), // check if user is authenticated
        });
    }
};

const getLocation = (req, res) => {};

module.exports = {
    getRestaurants,
    getLocation
}