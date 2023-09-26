const express = require('express');
const morgan = require("morgan");
const router = require('./routes');

const {conn}= require('./DB_connection')  //para la coneccion hay que tener en cuenta que sequelize trabaja de forma asincronica pos eso hay que manejar un async await.

const server = express() //instancia de experess
require('dotenv').config()
const {PORT}=process.env || 3001; //javascript se maneja mucho con valores por default, si la variable PORT no esta definida entonces se usara el puerto por default, en este caso "3001"
const cors=require('cors') 
//cada modulo cumple de una responsabilidad unica, este modulo se encarga de levantar el servidor
/*EN LA CARPETA 'CONTROLLERS' ESTAN LOS CONTROLADORES QUE VAMOS A USAR EN LA Callback DE LOS METODOS SERVER.GET,POST,PUT O DELETE, SE ENCARGAN DE COMO ENVIAMOS Y RECIBIMOS LA INFORMACION TANTO DE LA BASE DE DATOS COMO DEL CLIENTE O API */

server.use(morgan('dev'))  //este metodo lo usamos para agregar un midelware en la cadena de manejo de solicitudes y cuando no especificamos una ruta, este especifica el codigo a todas las rutas
                           //un middleware es una funcion que se encuentra entre la solicitud del cliente y la respuesta del servidor, con una logica determinada. ES una funcion intermediaria que ejecuta una logica especifica
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');         //esta configuracion es para cuando queremos un control mas exhaustivo de las personas que se comunican con el servidor, con * cualquier aplicacion puede hacer una peticion al server. Puedo limitar el acceso poniendo por ejemplo "http://localhost:3000/"
    res.header('Access-Control-Allow-Credentials', 'true'); //PARA HACER DEPLOY HAY QUE VERIFICAR QUE LAS POLITICAS/PERMISOS DE CORS NO ESTEN LIMITADOS
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

/* LAS CORS SE DEBEN UTILIZAR PORQUE SON UN PROTOCOLO DE INTERCAMBIO DE INFORMACION ENTREDOS PUNTOS, SE UTILIZA PORQUE EL BACKEND Y EL FRONT ESTAN EN DIFERENTES DOMINIOS Y HAY QUE ASEGURAR LA SEGURIDAD DE LOS DATOS. sI NO NECESITAMOS UNA CONFIG ESPECIFICA EN LOS HEADERS USAMOS LAS CORS QUE INSTALAMOS POR NPM */
//server.use(cors()) //se usa cuando no hay que especificad mucho las cors, es una configuracion por defecto
/* EL EXPRESS.JSON HAY QUE USARLO ANTES DE QUE SE CREEN LAS RUTAS, CUANDO HACEMOS METODOS POST NECESITAMOS UN BODY, EL BODY CUANDO LLEGA ESTA EN UNDEFINED PORQUE EL QUE CREA LA PROP BODY ES EXPRESS.JSON*/
server.use(express.json())
/* REQUEST-->MORGAN-->CORS-->EXPRESS.JSON-->RUTA('/rickandmorty')*/
server.use('/',router)  //la request pasa por los middelware (cors y express y luego viene a mi router)

server.listen(PORT,"0.0.0.0", async () => {
    await conn.sync({force:true })
    console.log("server raised in port " + PORT)
})

//server.post("/", (req,res) => {
//    res.status(202).json(req.body)
//})