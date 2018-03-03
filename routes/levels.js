var models 	= require('../models'),
	express	= require('express'),
	router		= express();

	router.get('/all', function(req, res, next){
		console.log('success level');
		models.Level.findAll({
			include: [{ model: models.Step, 
				include: [{ model: models.StepDetail, 
					include: [{ model: models.Choice}] }] }]
		}).then(levels => {
			res.json(levels);
		});
	})
	.get('/nextStep/:id/:step/:stepDetail', function(req, res, next){
		var nextLevel = '';
		var nextStep  = '';

		models.Level.findOne({
			where: {id: (Number(req.params.id))},
			include: [{
				model: models.Step,
				include: [{ model: models.StepDetail,
					order: [['created_at', 'DESC']],
					include: [{ model: models.Choice}]
				}]
			}],
			order: [[models.Step, 'created_at', 'ASC'],
				[models.Step, models.StepDetail, 'created_at', 'ASC']]
		}).then(level => {
			if(level == null){
				res.json({msg:'nextLevel'});
			}

			for(var i = 0; i < level.Steps.length; i++){
				if(nextStep == 'nextStep'){
					return res.status(200).json({data: level.Steps[i], msg: 'nextStep' });
					
				}
				
				for(var j = 0; j < level.Steps[i].StepDetails.length; j++){
					
					if(level.Steps[i].StepDetails[j].id > req.params.stepDetail){
						return res.json({data: level.Steps[i].StepDetails[j], msg: 'nextStepDetail'});
					}

					nextStep = 'nextStep';
				}				

				nextLevel = 'nextLevel';

			}

			if(nextLevel = 'nextLevel'){
				return res.status(200).json({data: level, msg: 'nextLevel' });
			}
		});

	})
	.get('/nextLevel/:id', function(req, res, next){
		models.Level.findAll().then(levels => {
			levels.forEach(function(el, key){
				if(el.id > req.params.id){
					return res.json({data: el});				
				}
			});
			return res.json({currentLevel: el.id});
		});
	});

	// starting crud

	router.post('/create', function(req, res){
		models.Level.create({
			title: req.body.title,
			description: req.body.description,
			data: req.body.data,
			status: req.body.status,
			video_id: req.body.video_id
		}).then((level) => {
			console.log(level);
			res.json(level);
		})
	})
	.get('/getAll', function(req, res){
		models.Level.findAll({
			order: [['order', 'ASC']],
			include: [{ model: models.Step, 
				include: [{ model: models.StepDetail, 
					include: [{ model: models.Choice}] }] }]
		}).then(levels => {
			res.json(levels);
		});
	})
	.get('/show/:id', function(req, res){
		models.Level.findOne({
			where: {id: (Number(req.params.id))},
		}).then(level => {
			res.json(level);
		});
	})
	.put('/edit/:id', function(req, res){
		models.Level.update({
			title: req.body.title,
			description: req.body.description,
			data: req.body.data,
			status: req.body.status,
			video_id: req.body.video_id
		},
		{ where: {id: (Number(req.params.id)) }}).then((level) => {
			res.json(level);
		})
	})
	.delete('/delete/:id', function(req, res){
		models.Level.update({
			status: '0'
		},
		{ where: {id: (Number(req.params.id)) }}).then((level) => {
			console.log(level);
			models.Level.findAll({order: [['order', 'ASC']]}).then(levels => {
				res.json(levels);
			});
		})
	})
	.post('/order', function(req, res){
		for(var i = 0; i < req.body.order.length; i++){
			var update = {
				order: i+1,
				id: req.body.order[i]
			};
			models.Level.upsert(update);
		}
		
		res.json({message: 'success'});
	});

module.exports = router;
