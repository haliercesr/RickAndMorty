require('dotenv').config();     
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DDB,DB_DEPLOY } = process.env;
const userModel= require('./models/User')
const favoriteModel= require('./models/Favorite') //guardamos las funciones

//ESTE ARCHIVO CONECTA TODA LA APLICACION CON NUESTRA BASE DE DATOS

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(
   // URL
   DB_DEPLOY,
   { logging: false, native: false }   //
);

// EJERCICIO  05
// Debajo de este comentario puedes ejecutar la función de los modelos.

//
userModel(sequelize)
favoriteModel(sequelize)
//

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
console.log(sequelize.models)
const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite,{through:'user_favorite'})
Favorite.belongsToMany(User,{through:'user_favorite'})

module.exports = {
   // User,
   // Favorite,
   ...sequelize.models,
   conn: sequelize,
};
