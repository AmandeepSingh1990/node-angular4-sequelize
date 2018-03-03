"use strict";

module.exports = function(sequelize, DataTypes) {
  console.log('stepDetails');
  var StepDetail = sequelize.define("StepDetail", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  	step_id: {
  		type: DataTypes.INTEGER,
  		references: {
  			model: 'steps',
  			id: 'id'
  		}
  	},
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    data: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    underscored: true,
  	freezeTableName: true,
  	tableName: 'steps_details',
  });

  StepDetail.associate = function(models){
  	StepDetail.belongsTo(models.Step, {foreignKey: 'step_id'});
    StepDetail.hasMany(models.Choice, {foreignKey: 'step_detail_id'})
  }

  return StepDetail;
};