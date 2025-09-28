import { 
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup, 
  signInWithRedirect, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged,
  getAuth
} from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/password
  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logOut = () => signOut(auth);
  const updateUserProfile = (name, photoURL) => updateProfile(auth.currentUser, { displayName: name, photoURL });

  // Unified social login
  const signUpWithProvider = async (providerName) => {
    setLoading(true);
    let provider;
    if (providerName === "google") provider = googleProvider;
    else if (providerName === "github") provider = githubProvider;
    else if (providerName === "facebook") provider = facebookProvider;
    else throw new Error("Unsupported provider");

    try {
      // Using popup for all providers
      const result = await signInWithPopup(auth, provider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const { data } = await axios.post("https://node-backend-hj5m.onrender.com/jwt", { email: currentUser.email });
          if (data?.token) localStorage.setItem("access-token", data.token);
        } catch (err) {
          console.error("JWT error:", err);
        }
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    updateUserProfile,
    signUpWithProvider, // ✅ Add this
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
