import { BASE_URL, myAxios } from "../base";

export const signUp = (user) => {
  return myAxios
    .post("/auth/signup", user)
    .then((response) => response.data);
};

export const login = (user) => {
  console.log(user);
  console.log(BASE_URL+"/auth/login");
  return myAxios
    .post("/auth/login", user)
    .then((response) => response.data);
};

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
  // window.location.reload(false);
  next();
};

// getCurrentUser
export const getCurrentUserDetail = () => {
  // return "parascoding";
  if (!isLoggedIn()) return "123";
  console.log(JSON.parse(localStorage.getItem("data")));
  return JSON.parse(localStorage.getItem("data"))?.id;
};

export const getRole = () => {
  if (!isLoggedIn) return "";
  return JSON.parse(localStorage.getItem("data"))?.role;
};
