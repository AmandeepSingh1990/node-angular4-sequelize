var models 	    = require('../models'),
	express	    = require('express'),
	router		= express();

	// CRUD

	router.post('/create', function(req, res){
		models.Step.create({
			title: req.body.title,
			description: req.body.description,
			data: req.body.data,
			status: '1',
            level_id: req.body.level_id,
			event_json: req.body.event_json
		}).then((step) => {
			console.log(step);
			res.json(step);
		})
	})
	.get('/getAll', function(req, res){
		models.Step.findAll({
			order: [['order', 'ASC']],
				include: [{ model: models.StepDetail, 
					include: [{ model: models.Choice}] }]
		}).then(step => {
			res.json(step);
		});
	})
	.get('/show/:id', function(req, res){
		models.Step.findOne({
			where: {id: (Number(req.params.id))},
		}).then(step => {
			res.json(step);
		});
	})
	.put('/edit/:id', function(req, res){
		models.Step.update({
			title: req.body.title,
			description: req.body.description,
			data: req.body.data,
            status: '1',
            level_id: req.body.level_id,
			event_json: req.body.event_json
		},
		{ where: {id: (Number(req.params.id)) }}).then((step) => {
			console.log(step);
			res.json(step);
		})
	})
	.delete('/delete/:id', function(req, res){
		models.Step.update({
			status: '0'
		},
		{ where: {id: (Number(req.params.id)) }}).then((step) => {
			models.Step.findAll({order: [['order', 'ASC']]}).then(step => {
				res.json(step);
			});
		})
	})
	.post('/order', function(req, res){
		for(var i = 0; i < req.body.order.length; i++){
			var update = {
				order: i+1,
				id: req.body.order[i]
			};
			// res.json(update);
			models.Step.upsert(update);
		}
		
		res.json({message: 'success'});
	});

module.exports = router;
