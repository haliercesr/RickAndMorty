const {Favorite} =require ('../DB_connection')

const homeFav= async (req,res)=>{
    try{

   const FAVORITES= await Favorite.findAll()
   
   
    return res.status(200).json(FAVORITES)

    }catch(error){
        return res.status(400).json({error:error.message})
    }

}

module.exports=homeFav;