import './Favorites.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import { orderCards, filterCards } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function Favourites(props) {
    const { onClose } = props
    const allCharacters = useSelector(state => state.allCharacters)
    const myFavorites = useSelector(state => state.myFavorites)
    const dispatch = useDispatch()
    const [num,setNum]=useState(0)

    useEffect(() => {
      }, [num]);

    function handleOrder(e) {

        const evento=e.target.value
        dispatch(orderCards(evento))
        setNum(num+1)
      console.log(num)

    }

    function handleFilter(e) {
        const evento=e.target.value
        dispatch(filterCards(evento))
        setNum(num+1)
        
    }


    return (
        <div className='ContainerFavorites'>
            {myFavorites.length===0? <div className='DivCard'>
                <div className='messajeFav'>
                    <p>No hay personajes</p>
                </div>
            </div>:null}
            <div className="CardsConteinerFavorite">
            <div className='selectDiv'>
                <select onChange={handleOrder}>
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>
                </select>
                <select onChange={handleFilter}>
                    <option value="Todos">Todos</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                </select>
            </div>
           { 
           (num===0?allCharacters.sort(function(a, b){return a.id - b.id}):myFavorites).map((element) => {
            return <Card
                key={element.id}
                id={element.id}
                name={element.name}
                //  status={element.status}
                // species={element.species}
                //gender={element.gender}
                //origin={element.origin.name}
                image={element.image}
                onClose={onClose} />
        })}
            </div>
        </div>
    )
}




export default Favourites;