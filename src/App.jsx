import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./util/axios.customize";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchHello = async () => {
      const res = await axios.get(`/v1/api/`);
      console.log("check res: ", res);
    };
    fetchHello();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
