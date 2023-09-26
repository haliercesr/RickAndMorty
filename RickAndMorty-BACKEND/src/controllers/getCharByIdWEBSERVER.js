const axios =require('axios'); //COMO ES UNA LIBRERIA SE TRAE DIRECTAMENTE CON EL NOMBRE

const getCharById=(res,id)=>{
    axios(`https://rickandmortyapi.com/api/character/${id}`)     //no sabemos cuanto va a tardar pero el then nos va a permitir contruir un plan para el resultado final, un value o un error
    .then(({data})=>{                                           //la respuesta de axios segun la documentacion es un objeto con muchas propiedades
       // let char={                                            //promesa().then(sucessHandler,errorHandler)
       // name:data.name,
       // gender:data.gender,
       // species:data.species,
       // origin:data.origin,
       // image:data.image,
       // status:data.status
       const{id,name,gender,species,origin:{name:origin},image,status}=data;      //hacemos otro destructuring de data y como las propiedades de nuestro objeto son iguales a sus valores podemos solo escribir el nombre
       let character={                                                         //origin es un objeto y de esta manera podemos extraer lo que queremos y renombrar esa propiedad
        id,
        name,                                                                     
        gender,
        species,
        origin,
        image,
        status
       }
       res.writeHead(200,{"content-type":"aplication/json"});
        res.end(JSON.stringify(character))
    })
    .catch((error)=>{
        res.writeHead(500,{"content-type":"text/plain"});
        res.end(error.message)
    })
    }

    module.exports = getCharById;