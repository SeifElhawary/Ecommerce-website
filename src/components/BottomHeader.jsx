import '../styles/Header.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from './MobileMenu';
function BottomHeader() {
  const [cat , setCat] = useState([]);
  const [catOpen , setOpen] = useState(false);
  const location = useLocation();
  const [menu , openMenu] = useState(false);
  useEffect(()=>{
    setOpen(false)
    openMenu(false)
  },[location])
  const Navv = [
    {
      title:"Home",
      to:"/"
    },
    {
      title:"About",
      to:"/about"
    },
    {
      title:"Accessories",
      to:"/accessories"
    },
    {
      title:"Blog",
      to:"/blog"
    },
    {
      title:"Contact",
      to:"/contact"
    },

  ]
  useEffect(()=>{
     const fetchNow = async ()=>{
      try{
        const fetchedData = await fetch('https://dummyjson.com/products/categories')
      const res = await fetchedData.json()
      setCat(res)
      }catch(err){
        console.log(err)
      }
      
    }
    fetchNow()
  },[])
 
  return (
   <div className="BottomHeader">
    <div className="container">
    {menu? <MobileMenu Navv={Navv} openMenu={openMenu}/> : null}
      <div className="left">
             <span onClick={()=>openMenu(true)} style={menu? {display:'none'}: null} className='responsive-menu'><MenuIcon/></span>
         <div onClick={()=>setOpen(!catOpen)} className="categoryBtn">
      <ListIcon/>
      <p>Browse Category</p>
      <ExpandMoreIcon/>
      <div  className={`navList ${catOpen == true? "active" : ""} `}>
      {cat && cat.length > 0 ? cat.map((item , index)=>{
        return <Link key={index} className='nn' to={`/category/${item.name}`}>{item.name}</Link>
      }) : null}
      </div>
      </div>
      </div>
      <nav>
        {Navv.map((nav , index)=>{
          return <Link key={index} className={location.pathname === nav.to ? "ul active" : "ul"} to={nav.to}>{nav.title}</Link>
        })}
      </nav>
      <div className="accountBtns">
        <Link className='acc' to="/login"><LoginIcon/>Login</Link>
        <Link className='acc' to="/SignUp"><GroupAddIcon/>Sign Up</Link>
      </div>
    </div>
   </div>
  )
}

export default BottomHeader