#!/usr/bin/node

/* return endpoint to enter the home page */
const getinit = (req, res) => {
    console.log(req.oidc.isAuthenticated()); // confirm user is authenticated
    if(req.oidc.isAuthenticated() == true){
        res.render("index.html", { // render the home page
            title: "@Ricardo1470", // set the title
            isAuthenticated: req.oidc.isAuthenticated(),}); // set the isAuthenticated variable
    } else {
        res.render("logout.html", {
            title: "@Ricardo1470", // set the title
            isAuthenticated: req.oidc.isAuthenticated(),}); // set the isAuthenticated variable
    }
};

const getTest = (req, res) => {
    //res.send('hola toño')
    res.render('test.html')
};

/* export functions*/
module.exports = {
    getinit,
    getTest
};
