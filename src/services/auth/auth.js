// isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    return false;
  };
  
  // doLogin
  export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
  };
  
  // doLogout
  export const doLogout = (next) => {
    localStorage.removeItem("data");
    window.location.reload(false);
    next();
  };
  
  // getCurrentUser
  export const getCurrentUserDetail = () => {
    // return "parascoding";
    if (!isLoggedIn()) return "123";
    return JSON.parse(localStorage.getItem("data"));
  };
  
  export const getRole = () => {
    if (!isLoggedIn) return "";
    return JSON.parse(localStorage.getItem("data"))?.role;
  };