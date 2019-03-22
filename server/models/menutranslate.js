'use strict';
module.exports = (sequelize, DataTypes) => {
  const menuTranslate = sequelize.define('menuTranslate', {
    language: DataTypes.STRING,
    translation: 'text character set utf8 collate utf8_unicode_ci'
  }, {});
  menuTranslate.associate = function(models) {
    // associations can be defined here
  };
  return menuTranslate;
};
