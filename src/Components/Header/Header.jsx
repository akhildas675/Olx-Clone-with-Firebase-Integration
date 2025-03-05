import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

import { AuthContext, FirebaseContext } from '../../store/Context';

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const { auth } = useContext(FirebaseContext); 
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                setUser(null);
                navigate('/login');
            })
            .catch((error) => {
                console.error("Logout Error:", error);
            });
    };

    return (
        <div className="headerParentDiv">
            <div className="headerChildDiv">
                <div className="brandName">
                    <OlxLogo />
                </div>
                <div className="placeSearch">
                    <Search />
                    <input type="text" />
                    <Arrow />
                </div>
                <div className="productSearch">
                    <div className="input">
                        <input type="text" placeholder="Find car, mobile phone, and more..." />
                    </div>
                    <div className="searchAction">
                        <Search color="#ffffff" />
                    </div>
                </div>
                <div className="language">
                    <span> ENGLISH </span>
                    <Arrow />
                </div>
                <div className="loginPage">
                    {user ? (
                        <span>Welcome {user.displayName}</span>
                    ) : (
                        <Link to="/login" className="loginLink">Login</Link>
                    )}
                    <hr />
                </div>
                {user && (
                    <span onClick={handleLogout} className="logout">Logout</span>
                )}
               
                <Link to="/create" className="sellMenu">
                    <SellButton />
                    <div className="sellMenuContent">
                        <SellButtonPlus />
                        <span>SELL</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
