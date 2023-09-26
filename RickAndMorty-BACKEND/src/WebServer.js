//const data = require('./utils/data.js');
const getCharById = require('./controllers/getCharById.js');
var fs = require("fs")
var http = require("http")
const PORT = 3002;


http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  

  if (req.url.startsWith('/rickandmorty/character/')) {   //el :id representa un identificador unico, req.url tiene mchos metodos y propiedades que podemos utilizar
    id = Number(req.url.slice(24))  //tambien se puede usar req.params.id
//ESTO ERA SIN PROMESAS
  /*  if (data) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data[id-1]))     //faltaba convertir el .js a tipo .JSON atens de enviar la respuesta porque sino tira eror
      } 

    return     //para que el codigo termine aca y no se ejecute nada por debajo
  } else {
      res.writeHead(404, {             //writeHead el encabezado ,le da informacion a nuestra respuesta.
        'Content-Type': 'text/plain'
      });
      return res.end("json not found")
  }*/

  //ESTO ES CON PROMESAS
  return getCharById(res,id)    
}

}).listen(PORT, "localhost")

