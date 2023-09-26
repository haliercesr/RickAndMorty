import './About.css';
import imgUser from '../About/1554918943968.jpeg';
import { Link } from 'react-router-dom';


function About() {

   return (

      <div className="About">;
         <div className="containerAbout">
            <div className="DetailAbout">
               <div className="titleDetailAbout">
                  <h1>Halier Cesar</h1>
               </div>
               <div className="textDetailAbout">
                  <h2>Contacto: </h2>
                  <h3 ><Link className='LinkLinkedin' to='https://www.linkedin.com/in/cesar-halier-440ba1110/'>www.linkedin.com/in/cesar-halier-440ba1110</Link></h3>
                  <h2>Email: </h2>
                  <h3>cesarhalier@gmail.com</h3>
               </div>
            </div>
            <div className="imgAbout">
               <img src={imgUser} alt=""></img>
            </div>
         </div>
      </div>
   );
}

export default About;