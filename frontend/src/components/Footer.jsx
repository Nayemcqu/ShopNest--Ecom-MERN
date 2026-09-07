import {Link} from 'react-router-dom'
import '../styles/footer.css'
export default function Footer(){

return(
<footer className="footer">
    <div className="footer-content">
        <div>
            <h3>ShopNest</h3>   
            <p className="footer-description">Your one-stop destination for all your shopping needs.</p>  
        </div>
        <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/return">Returns & Exchanges</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
        </ul>
 <p>&copy; {new Date().getFullYear()} ShopNest. All rights reserved.</p>

    </div>  


</footer>


)



}