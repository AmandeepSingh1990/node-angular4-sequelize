"use strict";

module.exports = function(sequelize, DataTypes) {
  var Level = sequelize.define("Level", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    data: DataTypes.STRING,
    status: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    video_id: DataTypes.INTEGER
  }, {
  	underscored: true,
  	freezeTableName: true,
  	tableName: 'levels',
  });

  Level.associate = function(models){
  	Level.hasMany(models.Step, {foreignKey: 'level_id'})
  }

  Level.beforeCreate((level, options) => {
    return Level.max('order').then((max) => {
					        level.order = max+1                  
                });
    });

  return Level;
};