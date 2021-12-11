import React from "react";
import { db, auth, provider } from "../firebase";

export const FilterContext = React.createContext();

const FilterProvider = (props) => {
  const dataUsuario = {
    uid: null,
    email: null,
    estado: null,
  };
  const [user, setUser] = React.useState(dataUsuario);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    detectarUsuario();
  }, []);

  const detectarUsuario = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          estado: true,
        });
      } else {
        setUser({
          uid: null,
          email: null,
          estado: false,
        });
      }
    });
  };

  const loginUser = async () => {
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  const logout = async () => {
    auth.signOut();

    setUser({
      uid: null,
      email: null,
      estado: false,
    });
  };

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, loginUser, logout, user }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
