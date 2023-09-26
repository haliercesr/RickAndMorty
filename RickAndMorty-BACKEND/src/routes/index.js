const {Router}= require('express')
const getCharById=require('../controllers/getCharById');
const login=require('../controllers/login');
const postUser =require('../controllers/postUser');
const postFav= require ('../controllers/postFav');
const deleteFav=require('../controllers/deleteFav');



//PRIMERO SE HACE EL ENRUTADO DE TODAS LAS RUTAS Y SE PRUEVA CON INSOMNIA, LUEGO DE QUE TODAS FUNCIONAN BIEN SE EMPIEZA A TRABAJAR EN LA LOGICA DE LOS CONTROLERS. LOS 
//cuando la reques llega a su final decimos que llego a su endpoint, en este caso a su controller especifico.
//Podemos tener un archivo router que se abra en dos archivos router (ejemplo user y post). Ejemplo creamos dos archivos UserROuter.js y PostRouters.js, 
/*
const userROuter=require("./userrouter")
const postROuter=require("./postrouter")

*/

const router=Router()

/*router.use("/users",userrouter)   //aca hago las rutas de usuario con sus controlers
router.use("/post",postrouter) //lo mismo para las post
*/

router.get('/character/:id',getCharById); //no hace falta poner la ruta completa. Por ejemplo un router userrouter al poner las rutas se puede omitir "/users" y  poner solo / porque ya se entiende que estamos en /USERS
router.get('/',login);
router.post('/Register',postUser);
router.post('/fav', postFav);
router.delete('/fav/:id',deleteFav);  //LOS HANDLERS en este caso es la funcion callback que se pasa como segundo parametro y NO interactuan directamente con la base de datos, para ello usamos los CONTROLERS.

module.exports= router;
