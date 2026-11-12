import '../styles/Header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/icon.png'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Cart } from './CartContext';
import { useContext, useEffect, useState } from 'react';

function TopHeader() {
    const { cartItems , favItems} = useContext(Cart);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || '';
    const [load, setLoad] = useState(false);
    const [res, setRes] = useState([]);

    useEffect(() => {
        setSearch(query);
    }, [query]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!query.trim()) {
                setRes([]);
                return;
            }
            setLoad(true);
            try {
                const ff = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
                const data = await ff.json();
                setRes(data.products.slice(0,5) || []);
            } catch (err) {
                console.log("error in fetching searchBox", err);
                setRes([]);
            } finally {
                setLoad(false);
            }
        };

        const timer = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handelSearch = (e) => {
        e.preventDefault();
        setRes([])
        if (search.trim() !== '') {
            navigate(`/products/search?q=${encodeURIComponent(search.trim())}`);
        } else {
            alert("Enter a product name or category to search");
        }
    };

    const handelLiveSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        navigate(`/products/search?q=${encodeURIComponent(value)}`);
    };

    return (
        <div className='topHeader'>
            <div className="container">
                <Link className='link' to="/">
                    <img src={logo} alt="logo" />
                    <h1>Seif Elhawary</h1>
                </Link>
                <form onSubmit={(e) => handelSearch(e)}>
                    <input 
                        value={search} 
                        onChange={(e) => handelLiveSearch(e)} 
                        type="text" 
                        placeholder='Search For Products' 
                        name='search' 
                        id='search'
                    />
                    <button className='submitBtn' type='submit'>
                        <SearchIcon className='searchBTn'/>
                    </button> 
                    
                    {res.length > 0 && !load && query.trim() !== '' && (
                        <ul className="searchResultsDropdown">
                            {res.map((i) => (
                             <Link key={i.id} to={`/products/${i.id}`}>
                                   <li >
                                    <img src={i.images[0]} alt={i.title} />
                                    <p>{i.title}</p>
                                </li>
                             </Link>
                            ))}
                        </ul>
                    )}
                </form>
                <div className="headerIcons">
                    <div className="icon">
                        <Link to={'/fav'}><FavoriteIcon/></Link>
                        
                        <span className='count'>{favItems.length}</span>
                    </div>
                    <div className="icon">
                        <Link to="/cart">
                            <ShoppingCartIcon/>
                        </Link>
                        <span className='count'>{cartItems ? cartItems.length : 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHeader;