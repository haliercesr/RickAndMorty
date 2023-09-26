import { useState } from 'react';
import styles from '../SearchBar/SearchBar.module.css'
import '@fortawesome/fontawesome-free/css/all.css'


export default function SearchBar(props) {
   const { onSearch } = props
   const [id, setId] = useState("")

   const handleChange = (event) => {
      setId(event.target.value)
   }

   return (
      <div className={styles.Divbarra}>
         <label>ID personaje</label>
         <div class={styles.inputcontainer}>
  <input type="text" id="bt" onChange={handleChange} class={styles.inputfield} placeholder="1,2,3..."/>
  <button className={styles.searchicon} onClick={() => {
  document.querySelector("#bt").value = ''
  onSearch(id)}}>&#128269;</button>
</div>
        
         <button className={styles.random} onClick={() => { onSearch(Math.floor(Math.random() * (826 + 1) + 1)) }} >🎲</button>
      </div>
   );
}


//<div className={styles.InputLupa} >
//<input type="text" id="bt" onChange={handleChange} placeholder="1,2,3,4,..." />
//<button className={styles.lupa} onClick={() => {
//   document.querySelector("#bt").value = ''
//   onSearch(id)
//}}>{<i class="fa-sharp fa-solid fa-magnifying-glass"></i>}</button>
//</div>


