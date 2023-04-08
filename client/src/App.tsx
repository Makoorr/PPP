import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Section from "./pages/Section";
import Navbar from "./components/Navbar";
import Wave from "./components/Wave";
import Project from "./pages/Project";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
              <Main />
          }/>
          <Route path="login" element={
              <Login />
            } />
          <Route path="register" element={
              <Register />
            } />
        </Route>
        <Route path="/tasks/:projectId/:sectionId" element={
            <RequireAuth>
              <Section />
            </RequireAuth>
              }/>
        <Route path="/projects/" element={
            <RequireAuth>
              <Project />
            </RequireAuth>
              }/>
        <Route path="/sections/:projectId" element={
            <RequireAuth>
              <Project />
            </RequireAuth>
              }/>
        <Route path="/logout" element={
          <RequireAuth>
            <Logout />
        </RequireAuth>
          } />
        <Route path="*" element={
          <RequireAuth>
            <NotFoundPage />
        </RequireAuth>
          } />
      </Routes>
  );
}

function Layout(){
  //Get page name
  let location = useLocation();
  let pageName = location.pathname.split("/")[1];
  if(pageName === ""){
    pageName = "home";
  }
  pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  pageName = "/"+pageName+".svg";

  return (
  <Wave 
    nav = { 
    <Navbar />
    }
    left = {
      <>
        <Outlet />
      </>
    }
    right= {
      <img src={ pageName } width="100%" height="700vh" alt="illustration" />
    }
    />
  );
}

function Logout() {
  localStorage.removeItem('token');
  return <Navigate to="/" />;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem('token') !== null;
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />;
  }

  return children;
}