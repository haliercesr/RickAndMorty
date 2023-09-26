import { useState, useEffect, useRef } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import './NavBar.css';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addFav } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
//import audio1 from '../../MP3SONGS/audio1.mp3'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css';





const NavBar = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { onSearch, SubmitSound, setAccess } = props;
    const allCharacters = useSelector(state => state.allCharacters);
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const navbarRef = useRef(null);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          setIsCollapsed(true);
        }
      };


    // const songs = [audio1];
    // const [cancionIndex, setCancionIndex] = useState(0);


    //   const handleNextSong = () => {
    //     setCancionIndex((cancionIndex + 1) % songs.length);
    //  };



    useEffect(() => {
        dispatch(addFav({ id: 0 }))

        window.addEventListener("click", handleClickOutside);
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };

    }, [dispatch])


    const HomeNav = () => {

        return <>

            <div className="pos-f-t">

                <nav className="navbar navbar-dark ">
                    <SearchBar SubmitSound={SubmitSound} onSearch={onSearch} />
                    <Link to='/Favorites'>
                        <button id="bt3Home" onClick={() => { SubmitSound() }}>
                            {
                                allCharacters.length > 0 ? (
                                    <span>❤️</span>
                                ) : (
                                    <span >🤍</span>
                                )
                            }
                            <span >{allCharacters.length}</span>
                        </button>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleCollapse}
                        aria-expanded={!isCollapsed}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <div className={`collapse ${isCollapsed ? '' : 'show'}`} id="navbarToggleExternalContent">
                    <div className="bg-dark p-4 custom-background">
                        <h5 className="left-align">
                            <Link to='/about'>
                                <button id="bottonCollapse1">
                                    About
                                </button>
                            </Link>
                        </h5>
                        <h5 className="left-align">
                            < button id="bottonCollapse2" onClick={() => {

                                SubmitSound()
                                setAccess(false) //tengo que cambiar el estado de access en app porque cuando me dirijo a el inicio, access sigue en true entonces el video quiere reproducirse.
                                navigate("/")

                            }
                            }>
                                Salir
                            </button>
                        </h5>

                    </div>
                </div>
            </div>


            <div className="SearchBar2">
                <SearchBar SubmitSound={SubmitSound} onSearch={onSearch} />
                <Link to='/Favorites'>
                <button id="bt3Home1" onClick={() => { SubmitSound() }}>
                    {
                        allCharacters.length > 0 ? (
                            <span>❤️</span>
                        ) : (
                            <span >🤍</span>
                        )
                    }
                    <span >{allCharacters.length}</span>
                </button>
            </Link>
            </div>

           

            <Link to='/about'>
                < button id="bt1Home" onClick={() => { SubmitSound() }}>
                    <span > About
                    </span></button>
            </Link>

            < button id="salirHome" onClick={() => {

                SubmitSound()
                setAccess(false) //tengo que cambiar el estado de access en app porque cuando me dirijo a el inicio, access sigue en true entonces el video quiere reproducirse.
                navigate("/")

            }
            }>
                <span > Salir
                </span></button>

        </>
    }

    const Favorites = () => {
        return <>
            <Link to='/about'>
                < button id="bt1Favorite" onClick={() => { SubmitSound() }}>
                    <span > About
                    </span></button>
            </Link>
            <Link to='/home'>
                <button id="bt2Favorite" onClick={() => { SubmitSound() }}>
                    <span > Home
                    </span></button>
            </Link>

        </>
    }

    const Detail = () => {
        return <>
            <Link to='/about'>
                < button id="bt1Detail" onClick={() => { SubmitSound() }}>
                    <span > About
                    </span></button>
            </Link>
            <Link to='/Favorites'>
                <button id="bt3Detail" onClick={() => { SubmitSound() }}>
                    {
                        allCharacters.length > 0 ? (
                            <span>❤️</span>
                        ) : (
                            <span >🤍</span>
                        )
                    }
                    <span >{allCharacters.length}</span>
                </button>
            </Link>
            <Link to='/home'>
                <button id="bt2Detail" onClick={() => { SubmitSound() }}>
                    <span > Home
                    </span></button>
            </Link>

        </>
    }

    const About = () => {
        return <>
            <Link to='/home'>
                <button id="bt2About" onClick={() => { SubmitSound() }}>
                    <span > Home
                    </span></button>
            </Link>
            <Link to='/Favorites'>
                <button id="bt3About" onClick={() => { SubmitSound() }}>
                    {
                        allCharacters.length > 0 ? (
                            <span>❤️</span>
                        ) : (
                            <span >🤍</span>
                        )
                    }
                    <span >{allCharacters.length}</span>
                </button>
            </Link>

        </>
    }



    return <div className="nav" ref={navbarRef}>


        {location.pathname === "/home" ? (HomeNav()) : null}
        {location.pathname === "/Favorites" ? (Favorites()) : null}
        {location.pathname === "/about" ? (About()) : null}
        {location.pathname.startsWith("/detail/") ? (Detail()) : null}
    </div>
}
export default NavBar;

//PARA "{location.pathname.startsWith("/detail/") ? (Detail()) : null}  SE PUEDE USAR .startsWith O .includes"

//<div className="contenedorReproductor">
//<audio className="Reproductor"controls autoPlay >
//    <source src={songs[1]} type="audio/mp3" />
//    Tu navegador no soporta la reproducción de audio.
//</audio>
//</div>