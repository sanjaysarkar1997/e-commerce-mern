// checking is user logged in frontend

const isUserLogged = () => {
  if (localStorage.getItem("vue-node-token")) {
    return true;
  }
  return false;
};

export default isUserLogged;
