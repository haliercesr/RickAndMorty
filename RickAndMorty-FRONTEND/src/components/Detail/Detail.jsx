import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from '../Detail/Detail.module.css';

function Detail(props) {
 const{URLSERVER}=props
   const { id } = useParams();

   const [character, setCharacter] = useState([]);
   console.log(character)
 
   useEffect(() => {                       
      axios(`${URLSERVER}character/${id}`).then(({ data }) => {    //NO USAMOS ASYNC AWAIT ACA PORQUE SUELE SER MAS CONVENIENTE UTILIZAR PROMESAS EN LOS USEEFFECT QUE UTILIZAR ASYNC/AWAIT
         if (data.name) {                                                   //SE PUEDE PERO ES MAS COMPLEJO PASAR A ASYNC AWAIT, MAS ABAJO LO EXPLICAMOS
            setCharacter(data);
         } else {
            window.alert('No hay personajes con ese ID');
         }
      });
      return setCharacter({});
   }, [id,URLSERVER]);


   return (
      <div className={styles.DetailContainerCard}>
         {character.name && (
            <div className={styles.container}>
               <div className={styles.Detail}>
                  <div className={styles.titleDetail}>
                     <h1 className={styles.titleDet}> {character.name}</h1>
                  </div>
                  <div className={styles.textDetail}>
                     <h2><span>Status:</span> {character.status}</h2>
                     <h2><span>Specie:</span> {character.species}</h2>
                     <h2><span>Gender:</span> {character.gender}</h2>
                     <h2><span>Origin:</span> {character.origin}</h2>
                  </div>
               </div>
               <div className={styles.img}>
                  <img src={character.image} alt=""></img>
               </div>
            </div>
         )};
      </div>
   );
}

export default Detail;



/*useEffect(()=>{
try{const info = async()=>{                                                //primero guardamos en la variable "info" lo que nos devuelve la funcion asincrona
const{data}= await axios(`http://localhost:3001/character/${id}`)
}

info()                                                               //despues dentro del hook tendrriamos que llamar a info
}catch(error){windows.alert(error.message)}

})
*/