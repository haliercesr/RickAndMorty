import{ADD_FAV,REMOVE_FAV,ORDER,FILTER, COUNT} from './types'
import axios from 'axios';

//const URL='http://localhost:3001/fav'
const URL='https://rickandmorty-backend-production.up.railway.app/'
export const addFav=(char)=>{    // es una accion asiNcrona y retornamos una funcion con dispatch
    return  async function(dispatch){    //LA FUNCION DISPATCH ES LA QUE CONTIENE LA PETICION ENTONCES LE PONEMOS EL ASYNC
       /* axios.post(`${URL}`, char)    // le enviamos la url y necesitamos mandarle la informacion porque es un metodo POST que esta esperando un body, es este caso "char"
        .then(({data})=>{            // tenemos que poner axios.post porque si solo dejamos axios la peticion que llegara al servidor sera de axios.get
            return dispatch(
                {
                    type: ADD_FAV,
                    payload: data
                }
            )
            })*/
        //AHORA LA CONVERTIMOS EN ASYNC Y AWAIT
        try{
        const {data}=await axios.post(`${URL}fav`, char)
        return dispatch(
            {
                type: ADD_FAV,
                payload: data
            }
        )
        }catch(error){window.alert(error.message)}
    }
    }

export const removeFav=(id)=>{        //con esto logramos quitarle responsabilidad al frontend, la logica ya la hace nuestro servidor y el frontend la muestra, ahora vamos a modificar el reducer
    return async (dispatch)=>{
        /*axios.delete(`${URL}/${id}`)
        .then(({data})=>{
            return dispatch(   {
                type: REMOVE_FAV,
                payload: data
            })
        })*/
    try{
      const {data}= await axios.delete(`${URL}fav/${id}`)
      return dispatch(   {
        type: REMOVE_FAV,
        payload: data
    })
    }catch(error){window.alert(error.message)}  //este es el lado del cliente, retornamos un mensaje cons windows.alert
     
}
}

export const filterCards=(gender)=>{
    return {
         type: FILTER,
         payload: gender       //gender es la propiedad para filtrar como por ejemplo status, origin, etc.
    }
}

export const orderCards=(orden)=>{        // orden sera a para ascendente y d para decendente
    return{
    type: ORDER,
    payload: orden
   }
}


export const counts=(string)=>{
return{
    type:COUNT,
    payload:string
}
}