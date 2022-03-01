import "./App.css";
import Signup from "./components/Signup";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import Plan from "./components/Plan";
import DeleteMsg from "./components/DeleteMsg";

//switch is to determine which page we are on, and route to determine which page we are going to
function App() {
  const [datFromDb, setdateFromDb] = useState("");

  return (
    <>
      <div>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/" element={<PrivateRoute />}>
                <Route
                  exact
                  path=""
                  element={
                    <Home setdateFromDb={setdateFromDb} datFromDb={datFromDb} />
                  }
                />
              </Route>
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/plan"
                element={<Plan datFromDb={datFromDb} />}
              />
              <Route exact path="/deleteMsg" element={<DeleteMsg />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
