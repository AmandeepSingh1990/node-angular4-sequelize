"use strict";

module.exports = function(sequelize, DataTypes) {
  var Step = sequelize.define("Step", {
  	level_id: {
  		type: DataTypes.INTEGER,
  		references: {
  			model: 'levels',
  			id: 'id'
  		}
  	},
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    data: DataTypes.STRING,
    status: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    event_json: DataTypes.TEXT,
    video_id: DataTypes.INTEGER
  }, {
    underscored: true,
  	freezeTableName: true,
  	tableName: 'steps',
  });

  Step.associate = function(models){
  	Step.belongsTo(models.Level, {foreignKey: 'level_id'});

  	Step.hasMany(models.StepDetail, {foreignKey: 'step_id'});
  }

  Step.beforeCreate((step, options) => {
    return Step.max('order').then((max) => {
					        step.order = max+1                  
                });
    });

  // Step.associate = function(models){
  // 	Step.hasMany(models.StepDetails, {foreignKey: 'step_id'})
  // }

  return Step;
};