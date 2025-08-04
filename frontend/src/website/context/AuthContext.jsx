import { createContext, useContext, useEffect, useState, useRef } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticating, setAunthenticating] = useState(false);
  const [login, setLogin] = useState();
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groupType, setGroupType] = useState("");
  const [authInfo, setAuthInfo] = useState();

  //Login
  const userLogin = async ({ username, password }) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://${window.location.hostname}:8000/account/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}:${response.text}`);
      }

      const result = await response.json();
      setLogin(result);
    } catch (error) {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  //Authentication Check || Get group permisssions
  const checkAuthStatus = async () => {
    if (isAuthenticated) return;
    try {
      setLoading(true);
      setAunthenticating(true);
      // Initial auth check
      const response = await fetch(
        `http://${window.location.hostname}:8000/account/group-link/`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAuthInfo(result);
        setGroupType(result.data.group);
        if (result.success) {
          setIsAuthenticated(true);
          setAunthenticating(false);
        }
      } else if (response.status === 401) {

        // Attempt to refresh the token

        const refreshResponse = await fetch(
          `http://${window.location.hostname}:8000/account/refresh/`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (refreshResponse.ok) {

          // Retry the initial auth check after refreshing
          setAunthenticating(true);
          const retryResponse = await fetch(
            `http://${window.location.hostname}:8000/account/group-link/`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (retryResponse.ok) {
            const retryResult = await retryResponse.json();
            setAuthInfo(retryResult);
            setGroupType(retryResult.data.group);

            if (retryResult.success) {
              setIsAuthenticated(true);
              setAunthenticating(false);
            }
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error verifying auth status:", error);
    } finally {
      setLoading(false);
      setAunthenticating(false);
    }
  };

  //Validate cookies after log in || fetch group permissions
  useEffect(() => {
    if (login) {
      setLoading(true);
      if (login.success) {
        checkAuthStatus();
      } else if (login.response === "Login, Failed") {
        setIsAuthenticated(false);
        alert("不正確的帳號、密碼，請重新輸入");
      }
    }

    if (loginError) {
      setIsAuthenticated(false);

      alert("登入時出現問題，請稍後再試一次.");
      setLoginError(false);
    }
    setLoading(false);
  }, [login, loginError]);

  // Check authentication on page load || Permissions
  useEffect(() => {
    checkAuthStatus();
  }, []);

  //Logout function
  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://${window.location.hostname}:8000/account/logout/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsAuthenticated(false);
        const result = await response.json();
      } else if (!response.ok) {
        throw new Error(`Error: ${response.status}:${response.text}`);
      }
    } catch (error) {
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        isAuthenticated,
        authenticating,
        loading,
        logout,
        groupType,
        authInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
