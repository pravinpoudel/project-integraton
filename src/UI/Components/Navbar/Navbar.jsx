import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import "../Navbar/Navbar.css"


const Navbar = ()=>{
	return(
		<>
			<nav className = "navbar-nav">
				<h3> FORTNITE</h3>
				<ul className="navbar-ul">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/aboutus">About-us</Link>
					</li>
					<li>
						<Link to="/login">Log-in</Link>
					</li>

					<li>
						<Link to="/contactus">Contact-us</Link>
					</li>
				</ul>
			</nav>

		
		</>
		);
};

export default Navbar;