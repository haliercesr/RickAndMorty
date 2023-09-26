import style from "../Form/Form.module.css"
import { useState, useRef } from "react"
import Validate from "./validation.js"
import video from "../../videos/videoform.mp4"
import { Link } from "react-router-dom"
import Alert from "../Alert/Alert"


export default function Form(props) {

  const { login, SubmitSound, access, navigate, showCustomAlert,closeCustomAlert } = props
  const [user, setData] = useState(
    {
      email: "",
      password: "",
    })
  const[currentTime,setCurrent]=useState(0)
  const [errors, setErrors] = useState({})


  function handleSubmit(e) {
    
    SubmitSound()
    e.preventDefault()
    login(user)
    console.log(access)
    
    
  }

  function handleChange(e) {
    const property = e.target.value
    const name = e.target.name
    setData({ ...user, [name]: property })
    setErrors(Validate({ ...user, [name]: property }))

  }

  const videoRef =useRef(null);

  const playVideo = () => {
    
    var playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
    
  };

  const handleVideoEnd = () => {
  
  navigate("/home")
    
  };

  //Primero definimos un estado igual a cero llamando currentTime, despues con el atributo onTimeUpdate que se ejecuta cada 1 segundo vamos actualizando el estado currentTime, asi podemos obtener el tiempo real de reproduccion.
  const handleTimeUpdate=()=>{   
    const videoElement = videoRef.current;
    if (videoElement) {
      setCurrent(videoElement.currentTime);
  }
  }

  const skipVideo = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const skipTime = 6; // Establece el tiempo en segundos para saltar
      videoElement.currentTime = skipTime;
    }
  };

  return <div className={style.contenedor}>
     {showCustomAlert? <Alert
        message="Usuario y/o contraseña invalidos"
        onClose={closeCustomAlert}
      />:null}

    <video className={style.videoform} ref={videoRef} onEnded={handleVideoEnd} onTimeUpdate={handleTimeUpdate}>
      <source src={video} type="video/mp4" />
      Tu navegador no soporta la reproducción de videos HTML5.
    </video>
    {access && (

      playVideo())}

     {access && videoRef.current && currentTime<6? <div className={style.ConteinerSkiButton}><button onClick={skipVideo} id={style.SkipButton}>{">>>SKIP<<<"}</button></div>:null}

    <form className={access ? style.forms1 : style.forms} onSubmit={handleSubmit}>
      <div className={style.FormConteiner}>
        <div className={errors.email ? style.labelform1 : style.labelform11}>
          <label className={style.label1}>Email</label>
          <input className={style.input1} name="email" onChange={handleChange} />
          <p className={style.p1}>{errors.email}</p>
        </div>
        <div className={errors.password ? style.labelform22 : style.labelform2}>
          <label className={style.label2}>Password</label>
          <input className={style.input2} type="password" name="password" onChange={handleChange} />
          <p className={style.p1}>{errors.password}</p>
        </div>
        <div className={style.buttonSubmit}>
          <button type="submit">Iniciar</button>
        </div>
        <span className={style.SpanRegistro}>¿No tienes una cuenta? <Link to="/Register" className={style.SpanLink}>Registrarse</Link></span>
      </div>

    </form>

  </div>;

}

