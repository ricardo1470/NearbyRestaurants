const mongoose = require('mongoose');

// connection to db
mongoose.connect('mongodb://localhost/nearbyrestaurants', {
    useUnifiedTopology: true
})

var db = mongoose.connection

db.on('error', function(err){
    console.log('connection error', err)
})

db.once('open', function(){
    console.log('Connection to DB successful')
})
