"use strict";

module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define("Choice", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  	step_detail_id: {
  		type: DataTypes.INTEGER,
  		references: {
  			model: 'steps_details',
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
  	tableName: 'choices',
  });

  Choice.associate = function(models){
  	Choice.belongsTo(models.StepDetail, {foreignKey: 'step_detail_id'});
  }

  return Choice;
};