import { LogIn } from "lucide-react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path = '/' element = {<Home />}  />
       <Route path='/signup' element={<Register/>} />
       <Route path='/login' element={<Login/>} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;