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

import AdminLayout from "./admin/components/AdminLayout";
import Users from "./admin/pages/Users";
import Jobcategories from "./admin/pages/Jobcategories";
import AdminJobs from "./admin/pages/Jobs";
import CreateJob from "./admin/pages/CreateJob";
import { JobCategoryProvider } from "./admin/context/JobCategoryContext";
import { ApplicationProvider } from "./admin/context/ApplicationContext";
import { SubscriptionProvider } from "./admin/context/SubscriptionContext";
import Applications from "./admin/pages/Applications";
import ApplicationDetails from "./admin/pages/ApplicationDetails";
import Subscriptions from "./admin/pages/Subscriptions";
import SubscriptionForm from "./admin/pages/SubscriptionForm";
import SubscriptionEdit from "./admin/pages/SubscriptionEdit";
import SubscriptionCreate from "./admin/pages/SubscriptionCreate";
import AdminGallery from "./admin/pages/Gallery";
import Settings from "./admin/pages/Settings";
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
    <JobCategoryProvider>
      <ApplicationProvider>
        <SubscriptionProvider>
          <Routes>
            {/* =====================================================
          USER SIDE
      ===================================================== */}

            <Route element={<UserLayout />}>
              {/* =================================================
            USER PUBLIC ROUTES
        ================================================= */}

              <Route path="/" element={<Home />} />

              <Route path="/subscription" element={<Subscription />} />

              <Route path="/gallery" element={<Gallery />} />

              <Route path="/contact" element={<ContactUs />} />

              <Route path="/about" element={<AboutUs />} />

              <Route path="/register" element={<Register />} />

              <Route path="/login" element={<Login />} />

              <Route path="/jobs" element={<Jobs />} />

              <Route path="/jobs/:id" element={<JobDetail />} />

              <Route path="/Carrier" element={<CarrierResources />} />

              <Route path="/skills" element={<SkillDevelopment />} />

              <Route path="/purchases" element={<Purchases />} />

              {/* =================================================
            USER PRIVATE ROUTES
        ================================================= */}

              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />

                <Route path="/applications" element={<MyApplication />} />

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

            <Route path="/admin/login" element={<AdminLogin />} />

            {/* =====================================================
          ADMIN PRIVATE ROUTES
      ===================================================== */}

            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                {/* =================================================
              /admin
              ↓
              Dashboard
          ================================================= */}

                <Route index element={<AdminDashboard />} />

                {/* =================================================
              FUTURE ADMIN ROUTES
          ================================================= */}
                <Route path="users" element={<Users />} />
                <Route path="jobcategories" element={<Jobcategories />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="jobs/create" element={<CreateJob />} />
                <Route path="applications" element={<Applications />} />
                <Route
                  path="applications/:applicationId"
                  element={<ApplicationDetails />}
                />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route
                  path="subscriptions/create"
                  element={<SubscriptionForm />}
                />
                <Route
                  path="subscriptions/edit/:id"
                  element={<SubscriptionEdit />}
                />
                <Route
                  path="subscriptions/create"
                  element={<SubscriptionCreate />}
                />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </SubscriptionProvider>
      </ApplicationProvider>
    </JobCategoryProvider>
  );
}

export default App;
