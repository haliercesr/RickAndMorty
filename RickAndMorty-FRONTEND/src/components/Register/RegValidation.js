export default function Validate(user){
let regexmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
let regexpass=/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/ //La contraseña debe contener al menos una letra, al menos un número y tener más de seis caracteres.
let errors={}
if (!user.email) {errors.email="Ingresar email"}
else {if(regexmail.test(user.email)) {errors.email=""}
    else{errors.email="Se requiere un email valido"}}
if(user.email.length>35) {errors.email="Hasta 35 caracteres"}


if(!user.password) {errors.password="Ingresar password"}
else{ if(user.password.length<6 || user.password.length>10){errors.password="Entre 6 y10 caracteres"}
     else{if(!regexpass.test(user.password))errors.password="Debe tener almenos 1 numero"
        else errors.password=""
    }}

return errors}
