'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    words: 'text character set utf8 collate utf8_unicode_ci',
    language: DataTypes.STRING,
    nativeLanguage: DataTypes.STRING,
    editable: DataTypes.BOOLEAN,
    share: DataTypes.BOOLEAN
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.users)
  };
  return List;
};
