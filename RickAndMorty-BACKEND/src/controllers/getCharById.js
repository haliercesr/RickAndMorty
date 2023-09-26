const axios =require('axios'); //COMO ES UNA LIBRERIA SE TRAE DIRECTAMENTE CON EL NOMBRE

const characterURL="https://rickandmortyapi.com/api/character/"
//ESTE CONTROLER SE ENCARGA DE OBTENER Y RETORNAR LA INFORMACION DE TODOS LOS PERSONAJES, EN ESTE CASO ES LA API, PERO PODRIA SER UNA BASE DE DATOS.
/*module.exports =(req,res)=>{
  // es una sting, por eso hay que convertirla a numero CUIDADO CON ESO.
  const id=Number(req.params.id) 
axios.get(characterURL+`${id}`)
.then(({data})=>{         //response.data, axios trae un objeto con varias propiedades por eso hacemos un destructuring
    const{id,name,gender,species,origin:{name:origin},image,status}=data
    let newChar={
    id,
    name,
    gender,
    species,
    origin,
    image,
    status

    }
    return newChar.name ? res.status(200).json(newChar) : res.status(404).send('Not found')    //cuando hay mas de una operacion es mejor poner un return porque va a seguir ejecutando el codigo y esto puede derivar a que el .then retorne mas de una respuesta causando un error. Solo puede enviar una respuesta para una peticion y viceversa
})
.catch((error)=>{
    
    res.status(500).json({error:error.message})
})
};
*/

//PASAMOS LA FUNCION ANTERIOR A ASINC Y AWAIT

module.exports =async (req,res)=>{
  // es una sting, por eso hay que convertirla a numero CUIDADO CON ESO.
  const Id=Number(req.params.id) 
  

  try{          //try seria similar a .then en promesas, luego ponemos un await en la peticion de axios para decirle "hasta que no termine la promesa no se ejecuta lo demas" y la guardamos en data
    
    const {data} = await axios.get(characterURL+`${Id}`)
  
    const{
      id,
      name,
      gender,
      species,
      origin:{name:origin},
      image,
      status
    }=data

    let newChar={
      id,
      name,
      gender,
      species,
      origin,
      image,
      status

  }

  return newChar.name ? res.status(200).json(newChar) : res.status(404).send('Not found')

  
} catch(error){
 res.status(500).json({error:error.message})
}
}

