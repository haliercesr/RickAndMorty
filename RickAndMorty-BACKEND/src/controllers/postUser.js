const {User} =require ('../DB_connection')

const postUser= async (req,res)=>{
    try{
   const{email,password,name}=req.body
   

   if (!email || !password || !name) return res.status(400).json({error:'Faltan datos'})

   const [createdUser, created]= await User.findOrCreate({   
                                                              //model query: busca segun las condiciones en where y si no las encuentra crea una entrada segun las condiciones. Luego devuelve la instancia creada o encontrada.
    where:{email},                                           // default se utiliza en caso de que no se encuentre nada.
    defaults:{                                                //findOrCreated te devuelve un array con dos respuestas, el usuario y un valor booleano que nos dice si se creo o no.
        password,
        name,
    },
   })
   if (created){
    return res.status(201).json({created,createdUser})
   } else{
    return res.status(200).json({created,createdUser})
   }

    }catch(error){
        return res.status(400).json({error:error.message})
    }

}

module.exports=postUser;