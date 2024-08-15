import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./util/axios.customize";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      const res = await axios.get(`/v1/api/account`);

      if (res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
          },
        });
      }
      setAppLoading(false);
    };
    fetchAccount();
  }, []);

  return (
    <>
      {appLoading === true ? (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
