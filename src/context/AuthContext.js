import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [userError, setUserError] = useState();

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //this is getting the current user from db using its method
      if (user) {
        setCurrentUser(user);
        setLoading(false);
        setUserId(user.uid);
      } else {
        setUserError("user not logged");
      }
    });
    // return unsubscribe;
    return () => unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    userId,
    userError,

    //this is exposing all of these functions to other components
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
}
