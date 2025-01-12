import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const {enqueueSnackbar}=useSnackbar()

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/login`, { email, password });

      if (!res.data) {
        console.error("Login failed: Invalid response");
        enqueueSnackbar('Invalid Credentials',{variant:"error"})
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name",res.data.name);
      setToken(res.data.token);
      setUser(res.data.name);
      enqueueSnackbar('Logged In Successfully',{variant:"success"})
    } catch (error) {
      console.error("Login Error:", error.message);
      enqueueSnackbar('Invalid Credentials',{variant:"error"})
    }
  };

const register = async (name, email, password) => {
    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/signup`, { name, email, password });
        if(res) enqueueSnackbar('User Registerd Successfully',{variant:"success"});
    }
    catch(err){
        console.log({error:err.message});
        enqueueSnackbar('User Registration Failed',{variant:"error"})
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
