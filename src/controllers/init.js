#!/usr/bin/node

/* return endpoint to enter the home page */
const getinit = (req, res) => {
    console.log(req.oidc.isAuthenticated());
    if(req.oidc.isAuthenticated() == true){
        res.render("index.html", {
            title: "@Ricardo1470",
            isAuthenticated: req.oidc.isAuthenticated(),});
    } else {
        res.render("logout.html", {
            title: "@Ricardo1470",
            isAuthenticated: req.oidc.isAuthenticated(),});
    }
    //res.send('hola mundo')
    //res.send(req.oidc.isAuthenticated() ? 'authenticated' : 'not authenticated');
};

/* export functions*/
module.exports = {
    getinit,
};
