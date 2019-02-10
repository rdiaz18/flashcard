'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    words: DataTypes.JSON,
    language: DataTypes.STRING,
    nativeLanguage: DataTypes.STRING
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.users)
  };
  return List;
};