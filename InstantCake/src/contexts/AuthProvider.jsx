import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create a new account
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Firebase Signup Error:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup / login with Google
  const signUpWithGmail = async () => {
    setLoading(true);
    try {
      const result = await signInWithRedirect(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Google Signup Error:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with email & password
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Firebase Login Error:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
    } catch (error) {
      console.error("Update Profile Error:", error);
    }
  };

  // Track signed-in user and get JWT
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser) {
        try {
          const { data } = await axios.post('https://node-backend-hj5m.onrender.com/jwt', {
            email: currentUser.email,
          });
          if (data?.token) {
            localStorage.setItem("access-token", data.token);
          }
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
    signUpWithGmail,
    login,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
