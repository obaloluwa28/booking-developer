// App.jsx - Updated with Layout component
import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductCatalogPage from './pages/ProductCatalogPage';
import GuidesPage from './pages/GuidesPages';
import SupportPage from './pages/SupportPage';
import AgenticAPIsPage from './pages/AgenticAPI';
import WisefaresFlightSearchAPI from './flight/FlightSearch/WisefaresFlightSearchAPI';
import FlightSearchPage from './flight/FlightSearch/FlightSearchPage';
import SchemasPage from './flight/FlightSearch/SchemasPage';
import WisefaresFlightRetrievePage from './flight/FlightRetrieve/WisefaresFlightRetrievePage';
import FlightRetrievePage from './flight/FlightRetrieve/FlightRetrievePage';
import SchemasPageR from './flight/FlightRetrieve/SchemasPageR';
import ErrorsPage from './flight/FlightSearch/ErrorsPage';
import ReleaseNotesPage from './flight/FlightSearch/ReleaseNotesPage';
import ReleaseNotesPageR from './flight/FlightRetrieve/ReleaseNotesPageR';
import ErrorsPageR from './flight/FlightRetrieve/ErrorPageR';
import AdminLoginPage from './BlogPage/Admin/AdminLoginPage';
import AdminDashboardPage from './BlogPage/Admin/AdminDashboardPage';
import AdminPostsPage from './BlogPage/Admin/AdminPostsPage';
import AdminCreatePostPage from './BlogPage/Admin/AdminCreatePostPage';
import AdminSettingsPage from './BlogPage/Admin/AdminSettingsPage';
import AdminRoute from './BlogPage/components/AdminRoute';
import BlogPage from './BlogPage/page/BlogPage';
import BlogPostPage from './BlogPage/page/BlogPostPage';
import Auth from './components/Auth';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import Application from './pages/Application';
import AuthenticationGuide from './pages/Guide/AuthenticationGuide';
import AiPoweredAppsGuide from './pages/Guide/AiPoweredAppsGuide';
import BestPracticesGuide from './pages/Guide/BestPracticeGuide';
import Airline from './pages/AirlineApi/Airline';
import WisefaresAirline from './pages/AirlineApi/WisefaresAirline';


function RouteLogger({ children }) {
  const location = useLocation();
  React.useEffect(() => {
    console.log('=== ROUTE CHANGED ===');
    console.log('Current route:', location.pathname);
    console.log('Full URL:', window.location.href);
    console.log('===================');
  }, [location]);
  return children;
}

function App() {
  return (
    <AuthProvider>
      <RouteLogger>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product-catalog" element={<ProductCatalogPage />} />
            <Route path="/product-catalog/agentic-apis" element={<AgenticAPIsPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/applications' element={<Application />} />
            <Route path='/guides/authentication' element={<AuthenticationGuide/>}/>
            <Route path='/guides/ai-powered-apps' element={<AiPoweredAppsGuide/>}/>
            <Route path='/guides/best-practices' element={<BestPracticesGuide/>}/>
            <Route path='/guides/getting-started' element={<BestPracticesGuide/>}/>
             <Route path='/product-catalog/airline' element={<Airline/>}/>
             <Route path='/product-catalog/wisefares-airline' element={<WisefaresAirline/>}/>


            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* Flight Search API Routes */}
           
            <Route path="/product-catalog/agentic-apis/wisefares-flight-search-api" element={<WisefaresFlightSearchAPI />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-search-api/flightsearch" element={<FlightSearchPage />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-search-api/schemas" element={<SchemasPage />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-search-api/errors/*" element={<ErrorsPage />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-search-api/release-notes" element={<ReleaseNotesPage />} />

            {/* Flight Retrieve API Routes */}
            <Route path="/product-catalog/agentic-apis/wisefares-flight-retrieve-api" element={<WisefaresFlightRetrievePage />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-retrieve-api/flightretrieve" element={<FlightRetrievePage />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-retrieve-api/schemas" element={<SchemasPageR />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-retrieve-api/errors/*" element={<ErrorsPageR />} />
            <Route path="/product-catalog/agentic-apis/wisefares-flight-retrieve-api/release-notes" element={<ReleaseNotesPageR />} />

            {/* Admin Routes - These will have no Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/posts"
              element={
                <AdminRoute>
                  <AdminPostsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/posts/create"
              element={
                <AdminRoute>
                  <AdminCreatePostPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/posts/edit/:id"
              element={
                <AdminRoute>
                  <AdminCreatePostPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <AdminSettingsPage />
                </AdminRoute>
              }
            />

            {/* 404 Route - This should be last */}
            <Route path="*" element={
              <div className="p-8 max-w-4xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-2">The page you're looking for doesn't exist.</p>
                <p className="text-gray-500 mb-4 font-mono">Path: {window.location.pathname}</p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go Home
                </Link>
              </div>
            } />
          </Routes>
        </Layout>
      </RouteLogger>
    </AuthProvider>
  );
}

export default App;