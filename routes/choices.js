var models 	    = require('../models'),
	express	    = require('express'),
	router		= express();

	// CRUD

	router.delete('/delete/:id', function(req, res){
		models.Choice.update({
			status: req.body.status
		},
		{ where: { id: (Number(req.params.id)) }}).then((choice) => {
			console.log(choice);
			res.json(choice);
		})
	});

module.exports = router;