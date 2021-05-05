import logo from './logo.svg';
import './App.css';
// import "../node_modules/bootstrap/dist/js/bootstrap.js"
import "../node_modules/bootstrap/dist/css/bootstrap.css"

import {Route, Switch} from "react-router-dom";

import Navbar from "./UI/Components/Navbar/Navbar"
import Home from "./UI/Components/Home/index";
import Products from "./UI/Components/Products/index";
import Aboutus from "./UI/Components/Aboutus/index";
import Contactus from "./UI/Components/Contactus/index";
import Productdetail from "./UI/Components/Products/Productcard/Productdetail";
import Login from "./UI/Components/Login/login";


function App() {
  return (
    <>
      <Navbar />
      	<Switch>
				<Route exact path="/"><Home /></Route>
        <Route path="/Products/:id"><Productdetail /></Route>
				<Route path="/products"><Products /></Route>
        <Route path="/login"><Login /></Route>
				<Route path="/aboutus"><Aboutus /></Route>
				<Route path="/contactus"><Contactus/></Route>
      
			</Switch>
    </>
  );
}

export default App;
