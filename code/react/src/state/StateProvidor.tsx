import { createContext, useState } from "react";

const defaultState = { state: "hi", setState: (state: string) => {} };
const MyContext = createContext(defaultState);
const StateProvidor = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState("hi");

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export default StateProvidor;
