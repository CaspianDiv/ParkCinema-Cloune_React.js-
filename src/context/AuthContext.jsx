import { createContext, useContext, useState } from "react"

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

function AuthContext({ children }) {
    const [userJson , setUserJson] = useState(JSON.parse(localStorage.getItem("user")) || null);

    function login(userData) {
        localStorage.setItem("user" , JSON.stringify(userData) || null);
        setUserJson(userData)
    };

    function logout() {
        localStorage.removeItem("user");
        setUserJson(null);
    };

  return (
    <>
        <authContext.Provider value={{userJson , login , logout}}>
            {children}
        </authContext.Provider>
    </>
  )
}

export default AuthContext
