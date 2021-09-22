var axios = require("axios").default;

const getRestaurants = (req, res) => {
    console.log(req.oidc.isAuthenticated());
    if (req.oidc.isAuthenticated() == true) {

        var options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
            params: {
                latitude: '12.91285',
                longitude: '100.87808',
                limit: '1',
                currency: 'USD',
                distance: '2',
                open_now: 'false',
                lunit: 'km',
                lang: 'en_US'
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': '0e91f04f86msh8bc4c4fc25e282cp190397jsn3272f9a1eb3e'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data.data);
            res.render("restaurants.html", {
                title: "@Ricardo1470",
                isAuthenticated: req.oidc.isAuthenticated(),
                data: response.data.data,
            });
        }).catch(function (error) {
            console.error(error);
        });

    } else {
        //res.send('no autenticado');
        res.render("logout.html", {
            title: "@Ricardo1470",
            isAuthenticated: req.oidc.isAuthenticated(),
        });
    }
};

module.exports = {
    getRestaurants
}