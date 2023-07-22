import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//<div className="bg-image" style={{backgroundImage:`url(/background-image.jpg)`}}></div>
function home(){
   return(
        <div className="main-page container d-flex flex-column justify-content-center align-items-center min-vh-100">
            {/*Background Image*/}
            <div className="logo-container text-center mb-4">
                <img src="logo.jpg" alt="Logo" className="logo img-fluid" style={{maxWidth:'30%',height:'30%'}}/>
            </div>
         
            <h1 className="title text-center mb-4">AR Building HK</h1>
            <Link to="/AR" className="text-cener">
                <button className="btn btn-primary btn-lg">Start Here</button>
            </Link>
        </div>
   )
}

export default home;