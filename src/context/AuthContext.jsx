import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
   updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();

const register = async (fullName, email, password) => {
    
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: fullName,
  });

  return userCredential;
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const googleSignIn = () => {
  return signInWithPopup(auth, provider);
};
const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
       user,
        register,
    login,
    googleSignIn, 
     logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};