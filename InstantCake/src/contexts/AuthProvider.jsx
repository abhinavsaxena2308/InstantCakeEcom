import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

// Create provider instances
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== Create email/password account =====
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // ===== Email/password login =====
  const login = async (email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // ===== Unified Social Login =====
  const signInWithProvider = async (providerName) => {
    setLoading(true);
    let provider;

    switch (providerName) {
      case "google":
        provider = googleProvider;
        break;
      case "github":
        provider = githubProvider;
        break;
      case "facebook":
        provider = facebookProvider;
        break;
      default:
        throw new Error("Unsupported provider");
    }

    try {
      return await signInWithPopup(auth, provider);
    } finally {
      setLoading(false);
    }
  };

  // ===== Logout =====
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // ===== Update user profile =====
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
    } catch (error) {
      console.error("Update Profile Error:", error);
    }
  };

  // ===== Track user and get JWT =====
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser) {
        try {
          const { data } = await axios.post('https://node-backend-hj5m.onrender.com/jwt', {
            email: currentUser.email,
          });
          if (data?.token) localStorage.setItem("access-token", data.token);
        } catch (err) {
          console.error("JWT fetch error:", err);
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
    signInWithProvider,
    updateUserProfile,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
