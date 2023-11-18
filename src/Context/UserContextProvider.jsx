  import React, { useState } from "react";
  import UserContext from './UserContext'

  const UserContextProvider =({children})=>{
   const [user, setUser] = useState(null)
   const [token, setToken] = useState(localStorage.getItem('token') || null);
   const [userType, setUserType]= useState(null)
     // Function to handle user login
     function login(userData) {
      setUser(userData);
      console.log(userData);
      }
     function token_d( authToken) {
      setToken(authToken);
      localStorage.setItem('token', authToken);
      console.log(authToken)
  }

  // Function to handle user logout
  function logout() {
      
      setToken(null);
      localStorage.removeItem('token');
  }

  // Function to check if the user is authenticated
  function isAuthenticated() {
      return !!user && !!token;
  }

  // Define the value of the context
  const value = {
      user,
      userType,
      token,
      token_d,
      login,
      logout,
      isAuthenticated,
  };

    return(
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    )
  }
  export default UserContextProvider