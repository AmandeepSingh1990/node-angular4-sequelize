var express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    cors        = require('cors'),
    path        = require('path'),
    levels      = require('./routes/levels'),
    steps       = require('./routes/steps'),
    stepDetails = require('./routes/stepDetails'),
    choices     = require('./routes/choices');
    
    app
        .use(cors())
        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())
        .use(express.static(path.join(__dirname, 'public')))
        .get('/', function(req, res){
            console.log('success');
        })
        .use('/levels', levels)
        .use('/steps', steps)
        .use('/stepDetail', stepDetails)
        .use('/choice', choices); 

    app.listen(process.env.PORT || 5000);