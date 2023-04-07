import * as React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { fakeAuthProvider } from "./auth";
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
    // <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/tasks/:projectId/:sectionId"
          element={
            // <RequireAuth>
              <Section />
            // </RequireAuth>
          }
        />
        <Route
          path="/projects/"
          element={
            // <RequireAuth>
              <Project />
            // </RequireAuth>
          }
        />
        <Route
          path="/sections/:projectId"
          element={
            // <RequireAuth>
              <Project />
            // </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    // </AuthProvider>
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
    <Navbar>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/login">Login</a>
      </li>
      <li>
        <a href="/register">Register</a>
      </li>
    </Navbar>
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

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}