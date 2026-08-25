import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Gallery from "./Pages/Gallery";
import  Home  from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Subscription from "./Pages/Subscription";
import Navbar from "./components/Navbar";
import { Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTop from './components/ScrollToTop'
import Jobs from "./Pages/Jobs";
import JobDetail from "./Pages/JobDetail";
import Profile from "./Pages/Profile";
import MyAppication from "./Pages/MyAppication";
import CarrierResources from "./Pages/CarrierResources";
import SkillDevelopment from "./components/SkillDevelopment";


function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applications" element={<MyAppication />} />
        <Route path="/Carrier" element={<CarrierResources />} />
        <Route path="/skills" element={<SkillDevelopment />} />
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;