const {User} =require ('../DB_connection')

const login= async (req,res)=>{
    try{
   const{email,password}=req.query
console.log(email)
   if (!email || !password) return res.status(400).json({error:'Faltan datos'})

   const loggedUser= await User.findOne({where:{email},
})

if(!loggedUser){
    return res.status(404).json({error:'Usuario no encontrado'})
} else{
    return loggedUser.password===password
    ? res.status(200).json({access:true})
    :res.status(401).json({error:'Contraseña incorrecta'})
}

    }catch(error){
        return res.satus(500).json({error:error.message})
    }

}

module.exports=login;