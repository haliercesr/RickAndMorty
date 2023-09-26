import styles from '../Card/Card.module.css';
import {Link} from 'react-router-dom';
import { addFav,removeFav } from '../redux/actions/actions';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';



function Card(props) {
   const{onClose,name,status,species,gender,origin,image,id,addFavCard,removeFavCard,allCharacters}=props
   const[IsFav,setIsFav]=useState(false)


   useEffect(() => {
      allCharacters.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [allCharacters,props.id]);

   const handleFavorite=(event)=>{
      event.preventDefault();
      if(IsFav){
         setIsFav(false);
         removeFavCard(props.id);
      } else {
         setIsFav(true);
         addFavCard({name,status,species,gender,origin,image,id})
         console.log({name,status,species,gender,origin,image,id})
      }
   }

   return (
      
      <div className={styles.DivCard}>
          <div className={styles.Divboton}>
          <div className={styles.CardId}>{id}</div>
          {
          IsFav ? (
           <button className={styles.buttonFavorite} onClick={handleFavorite}>❤️</button>
            ) : (
           <button className={styles.buttonFavorite} onClick={handleFavorite}>🤍</button>
            )
          }
          <button className={styles.buttonONClose} onClick={()=>{
            onClose(id)
            }
            } >X</button>
          
          </div>
          <Link to={`/detail/${id}`}>
          <div className={styles.Divimg}>
            <img src={image} alt='' /> 
          </div>
        
         <div className={styles.Divtext}> 
           <h2 >{name}</h2>
          
           
         </div>
         </Link>
         
      </div>
      
   );
}

function mapDispatchToProps(dispatch) {
   return {
      addFavCard: (char) => {dispatch(addFav(char)) },
      removeFavCard: (id) => { dispatch(removeFav(id))}
   }
}

function mapStateToProps(state) {
   return {
      allCharacters: state.allCharacters
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card)


