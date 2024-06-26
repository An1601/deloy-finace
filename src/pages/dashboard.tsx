import { Fragment, useEffect, useState } from "react";
import Sidebar from "../components/common/sidebar";
import Switcher from "../components/common/switcher";
import Header from "../components/common/header/index";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navigate, Outlet } from "react-router-dom";
import { useAccessToken } from "@redux/useSelector";

function Dashboard() {
  const [MyclassName, setMyClass] = useState("");
  const accessToken = useAccessToken();
  const Bodyclickk = () => {
    if (localStorage.getItem("zenverticalstyles") == "icontext") {
      setMyClass("");
    }
    if (window.innerWidth > 1024) {
      const html = document.documentElement;
      if (html.getAttribute("icon-overlay") === "open") {
        html.setAttribute("icon-overlay", "");
      }
    }
  };

  useEffect(() => {
    import("preline");
  }, []);

  return accessToken ? (
    <Fragment>
      <HelmetProvider>
        <Helmet
          htmlAttributes={{
            lang: "en",
            dir: "ltr",
            "data-menu-styles": "dark",
            class: "light",
            "data-nav-layout": "vertical",
            "data-header-styles": "light",
            "data-vertical-style": "overlay",
            "data-icon-text": MyclassName,
          }}
        />
        <Switcher />
        <div className="page bg-light_finance-background1">
          <div className="hidden sm:block">
            <Header />
          </div>
          <div className="hidden sm:block">
            <Sidebar />
          </div>
          <div className="!mt-0 sm:!mt-[60px] content main-index">
            <div className="main-content" onClick={Bodyclickk}>
              <Outlet />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </Fragment>
  ) : (
    <Navigate to="signin" />
  );
}

export default Dashboard;
