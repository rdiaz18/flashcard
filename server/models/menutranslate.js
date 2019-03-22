'use strict';
module.exports = (sequelize, DataTypes) => {
  const menuTranslate = sequelize.define('menuTranslate', {
    language: DataTypes.STRING
  }, {});
  menuTranslate.associate = function(models) {
    // associations can be defined here
  };
  return menuTranslate;
};
