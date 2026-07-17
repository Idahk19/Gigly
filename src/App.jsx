import { LogIn } from "lucide-react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Privacy from "./pages/PrivacyPolicy";
import Terms from "./pages/TermsConditions"
import Support from "./pages/Support"
import FAQ from "./pages/Faq"
import About from "./pages/About" 
import Dashboard from "./pages/Dashboard" 
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./pages/Tasks"
import Projects from "./pages/Projects";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path = '/' element = {<Home />}  />
       <Route path='/signup' element={<Register/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/privacypolicy' element={<Privacy/>} />
       <Route path='/termsconditions' element={<Terms />} />
       <Route path='/support' element={<Support/>} />
       <Route path='/faq' element={<FAQ/>} />
       <Route path='/about' element={<About/>} />
       <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
          <Route
        path="/dashboard/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
          <Route
        path="/dashboard/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;