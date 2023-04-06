const User = require('./User');
const Employee = require('./Gallery');
const TimeOff = require('./Painting');

//Gallery.hasMany(Painting, {
  //foreignKey: 'gallery_id',
//});

//Painting.belongsTo(Gallery, {
  //foreignKey: 'gallery_id',
//});

module.exports = { User, Employee, TimeOff };
