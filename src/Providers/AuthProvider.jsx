import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";


const googleProvider = new GoogleAuthProvider()

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    const updateUser = (name, photo, phoneNumber) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:photo, phoneNumber: phoneNumber
        })
    }

    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            // if(currentUser) {
            //     axiosCommon.post('/jwt', {email: user?.email})
            //     .then(res => {
            //         localStorage.setItem('accessToken', res.data.token)
            //     })
                
            // }
            // else{
            //     //remove token from localStorage when logout
            //     localStorage.removeItem('accessToken');
            // }
          setUser(currentUser);
          setLoading(false);
          
        });
        return () => {
          unSubscribe;
        };
      }, [user?.email]);
    

    const authInfo = {
            user,
            setLoading,
            loading,
            createUser,
            loginUser,
            logOut,
            updateUser,
            googleLogin,
    }
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;