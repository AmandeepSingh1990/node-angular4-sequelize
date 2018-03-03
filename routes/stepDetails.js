var models 	    = require('../models'),
	express	    = require('express'),
	router		= express();

	// CRUD

	router.post('/create', function(req, res){
		// res.json(JSON.parse(req.body.choice)[0]);
		models.StepDetail.create({
			title: req.body.title,
			description: req.body.description,
			data: req.body.data,
			type: req.body.type,
			status: '1',
            step_id: req.body.step_id
		},{
            include: [{ model: models.Choice }]
        }).then((stepdetail) => {
			
			var choices = JSON.parse(req.body.choices);
			for(var i = 0; i < choices.length; i++){
				var create = {
					title: choices[i].title,
					description: choices[i].description,
					data: choices[i].data,
					type: choices[i].type,
					step_detail_id: stepdetail.id
				};
				models.Choice.create(create);
			}
			
			res.json({success: 'success'});
		})
	})
	.get('/getAll', function(req, res){
		models.StepDetail.findAll({ 
					include: [{ model: models.Choice}]
		}).then(stepdetail => {
			res.json(stepdetail);
		});
	})
	.get('/show/:id', function(req, res){
		models.StepDetail.findOne({
			where: {id: (Number(req.params.id))},
			include: [{ model: models.Choice }]
		}).then(stepdetail => {
			res.json(stepdetail);
		});
	})
	.put('/edit/:id', function(req, res){
		models.StepDetail.find({
			where: {id: (Number(req.params.id))},
			include: [{ model: models.Choice }]
		}).then((stepdetail) => {
			models.StepDetail.update({
				title: req.body.title,
				description: req.body.description,
				data: req.body.data,
				status: '1',
				step_id: req.body.step_id
			},
			{ where: {id: (Number(req.params.id))}}).then((val) => {
				var choices = JSON.parse(req.body.choice);
				for(var i = 0; i < choices.length; i++){
					var update = {
						title: choices[i].title,
						description: choices[i].description,
						data: choices[i].data,
						type: choices[i].type,
						step_detail_id: stepdetail.id,
						id: choices[i].id || ''
					};
					models.Choice.upsert(update);
				}
				
				res.json({success: 'success'});
			})
		})
		
	})
	.delete('/delete/:id', function(req, res){
		models.StepDetail.update({
			status: '0'
		},
		{ where: { id: (Number(req.params.id)) }}).then((stepdetail) => {
			console.log(stepdetail);
			res.json(stepdetail);
		})
	});

module.exports = router;
