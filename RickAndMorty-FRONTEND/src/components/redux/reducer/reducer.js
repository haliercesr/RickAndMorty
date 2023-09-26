import { ADD_FAV,REMOVE_FAV,FILTER,ORDER } from "../actions/types"


const initialState= {
    myFavorites : [],
    allCharacters:[],
}


const rootReducer=(state=initialState,{type,payload}) => {         //nosotros en el frontend, el cliente antes hacia click en el corazon de una carta y se guardaba en favoritos en nuestro estado global
    switch(type){                                                  //ahora nuestra action creator es asincrona (antes era sincrona) y puede ser asicrona gracias al redux-thunk que configuramos al principio, como se hace esto? en la misma funcion que esta recibiendo el personaje, una funcion que retorna otra funcion es un clausers o que estamos usando ahora.
        case ADD_FAV:                                              // se hace una peticion post o delete con axios y los controadores de mi servidor hacen la logica para guardar y enviar los datos de las cartas favoritas
            return{
                ...state,
                myFavorites: payload, // Agregar payload a myFavorites
                allCharacters: payload // Agregar payload a allCharacters
              };
        case REMOVE_FAV:
            return{
                ...state, 
                allCharacters:payload,
                myFavorites:payload
            }
        case FILTER:
            return{
                ...state,
                myFavorites: payload==="Todos"?state.allCharacters:state.allCharacters.filter((char)=>{ return char.gender===payload})    //en la action creator el payoad de filter sera la propiedad gender osea male o female
            }
        case ORDER:
            return{
                ...state,
                myFavorites: payload==="A"?state.allCharacters.sort(function(a, b){return a.id - b.id}) : state.allCharacters.sort(function(a, b){return b.id - a.id})  //el primer .sort los ordena de forma ascendente y el segundo de forma descendente
            }
        default:
            return {...state}
    }
}

export default rootReducer;