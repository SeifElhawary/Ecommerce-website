import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
function MobileMenu({Navv , openMenu}){
    return(
        <div className="menu-mobile">
            <span onClick={()=> openMenu(false)} className="close"><CloseIcon/></span>
        <ul>
            {Navv.map((nav , index)=>{
          return <Link key={index} className={location.pathname === nav.to ? "ul active" : "ul"} to={nav.to}>{nav.title}</Link>
        })}
        </ul>
         <div className="accountBtns">
        <Link className='acc' to="/login"><LoginIcon/>Login</Link>
        <Link className='acc' to="/SignUp"><GroupAddIcon/>Sign Up</Link>
      </div>
        </div>
    )
}
export default MobileMenu;