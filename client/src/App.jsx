import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Gallery from "./Pages/Gallery";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Subscription from "./Pages/Subscription";

import { Route, Routes } from "react-router-dom";

import Jobs from "./Pages/Jobs";
import JobDetail from "./Pages/JobDetail";
import Profile from "./Pages/Profile";
import MyApplication from "./Pages/MyAppication";
import CarrierResources from "./Pages/CarrierResources";
import SkillDevelopment from "./components/SkillDevelopment";
import Purchases from "./Pages/Purchases";
import SavedApplication from "./Pages/SavedApplication";

import PrivateRoute from "./components/PrivateRoute";

// =====================================================
// USER LAYOUT
// =====================================================

import UserLayout from "./components/UserLayout";

// =====================================================
// ADMIN IMPORTS
// =====================================================

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminPrivateRoute from "./admin/AdminPrivateRoute";

import AdminDashboard from "./admin/pages/Dashboard";

// Future Admin Pages
// import AdminUsers from "./admin/pages/AdminUsers";
// import AdminJobs from "./admin/pages/AdminJobs";
// import AdminApplications from "./admin/pages/AdminApplications";
// import AdminSubscriptions from "./admin/pages/AdminSubscriptions";
// import AdminGallery from "./admin/pages/AdminGallery";
// import AdminContacts from "./admin/pages/AdminContacts";
// import AdminSettings from "./admin/pages/AdminSettings";

function App() {
  return (
    <Routes>

      {/* =====================================================
          USER SIDE
      ===================================================== */}

      <Route element={<UserLayout />}>

        {/* =================================================
            USER PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/subscription"
          element={<Subscription />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<ContactUs />}
        />

        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetail />}
        />

        <Route
          path="/Carrier"
          element={<CarrierResources />}
        />

        <Route
          path="/skills"
          element={<SkillDevelopment />}
        />

        <Route
          path="/purchases"
          element={<Purchases />}
        />

        {/* =================================================
            USER PRIVATE ROUTES
        ================================================= */}

        <Route element={<PrivateRoute />}>

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/applications"
            element={<MyApplication />}
          />

          <Route
            path="/savedapplication"
            element={<SavedApplication />}
          />

        </Route>

      </Route>


      {/* =====================================================
          ADMIN LOGIN
          
          IMPORTANT:
          Admin login ke upar User Navbar/Footer nahi aayega.
      ===================================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =====================================================
          ADMIN PRIVATE ROUTES
      ===================================================== */}

      <Route element={<AdminPrivateRoute />}>

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* =================================================
              /admin
              ↓
              Dashboard
          ================================================= */}

          <Route
            index
            element={<AdminDashboard />}
          />


          {/* =================================================
              FUTURE ADMIN ROUTES
          ================================================= */}

          {/*

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="jobs"
            element={<AdminJobs />}
          />

          <Route
            path="applications"
            element={<AdminApplications />}
          />

          <Route
            path="subscriptions"
            element={<AdminSubscriptions />}
          />

          <Route
            path="gallery"
            element={<AdminGallery />}
          />

          <Route
            path="contacts"
            element={<AdminContacts />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

          */}

        </Route>

      </Route>

    </Routes>
  );
}

export default App;