import style from "../Register/Registro.module.css"
import RegValidation from "./RegValidation.js"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Alert from "../Alert/Alert";



export default function Registro(props) {
    const { SubmitSound, navigate, URLSERVER} = props
    const [Message, setMessage] = useState({
        ShowCustomAlert1: false,
        ShowCustomAlert2: false,
        ShowCustomAlert3: false,
        message1: "Registro exitoso!",
        message2: "Email ya registrado!",
        message3: "Porfavor ingrese un Usuario y constraseña",

    });
   

    const openCustomAlert = (numMessage) => {
        if(numMessage === 1)setMessage({ ...Message, ShowCustomAlert1: true })
        if(numMessage === 2)setMessage({ ...Message, ShowCustomAlert2: true })
        if(numMessage === 3)setMessage({ ...Message, ShowCustomAlert3: true })

    };

    const closeCustomAlert = () => {
        setMessage({ ...Message, ShowCustomAlert1: false })
        navigate("/")
    };

    const closeCustomAlert1 = () => {
        setMessage({ ...Message, ShowCustomAlert2: false })
    };

    const closeCustomAlert2 = () => {
        setMessage({ ...Message, ShowCustomAlert3: false })
    };

    const [user, setData] = useState(
        {
            email: "",
            password: "",
            name:""
        })
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const property = e.target.value
        const name = e.target.name
        setData({ ...user, [name]: property })
        setErrors(RegValidation({ ...user, [name]: property }))

    }

    const handleSubmit = async (e) => {
        SubmitSound()
        e.preventDefault()
        try {
            const postData = {
                email: user.email,
                password: user.password,
                name:user.name

            }
            const { data } = await axios.post(`${URLSERVER}Register/`, postData)
            const { created,createdUser } = data
            
            localStorage.setItem('createdUser', createdUser.name) //solo acepta valores de string, verificar
            
            if (!created) {
                openCustomAlert(2)
                
            } else {
                openCustomAlert(1)
                
            }


        } catch (error) { openCustomAlert(3) }
    }


    return <div className={style.RegContenedor}>
        {Message.ShowCustomAlert1 ? <Alert
            message="Registro exitoso!"
            onClose={closeCustomAlert}
        /> : null}
        {Message.ShowCustomAlert2 ? <Alert
            message="Email ya registrado, porfavor intentelo de nuevo"
            onClose={closeCustomAlert1}
        /> : null}
        {Message.ShowCustomAlert3 ? <Alert
            message="Porfavor ingrese un usuario y una contraseña"
            onClose={closeCustomAlert2}
        /> : null}
        <form className={style.RegForms} onSubmit={handleSubmit}>

            <div className={style.FormConteiner}>
                <span>REGISTRO</span>
                <div className={style.labelform11}>
                    <div className={style.labelReg}>
                        <input placeholder="Nombre" className={style.input1} name="name" onChange={handleChange}/>
                    </div>
                </div>
                <div className={style.labelform11}>
                    <div className={style.labelReg}>
                        <input placeholder="Apellido" className={style.input1} name="Apellido" />
                    </div>
                </div>
                <div className={errors.email ? style.labelform1 : style.labelform11}>
                    <div className={style.labelReg}>
                        <input placeholder="Email" className={style.input1} name="email" onChange={handleChange} />
                    </div>
                    <p className={style.p1}>{errors.email}</p>
                </div>
                <div className={errors.password ? style.labelform22 : style.labelform2}>
                    <div className={style.labelReg}>
                        <input placeholder="Password" className={style.input2} type="password" name="password" onChange={handleChange} />
                    </div>
                    <p className={style.p1}>{errors.password}</p>
                </div>
                <div className={style.buttonSubmit}>
                    <button type="submit">Registrar</button>
                </div>
                <span ><Link to="/" className={style.SpanLink}>Volver al inicio</Link></span>
            </div>

        </form >


    </div >;

}



