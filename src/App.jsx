import { LogIn } from "lucide-react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Privacy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/termsconditions"
import Support from "./pages/Support"
import FAQ from "./pages/FAQ"
import About from "./pages/About"

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path = '/' element = {<Home />}  />
       <Route path='/signup' element={<Register/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/privacypolicy' element={<PrivacyPolicy/>} />
       <Route path='/termsconditions' element={<TermsConditions />} />
       <Route path='/support' element={<Support/>} />
       <Route path='/faq' element={<FAQ/>} />
       <Route path='/about' element={<About/>} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;