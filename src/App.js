import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Home from "./pages/Home";
import AR from "./pages/AR";
import Error from "./pages/ErrorPage";
function App(){
  
  return (
 
    <Router> 
       
      <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/AR" element={<AR/>}/> 
            <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
    );
}

export default App; 