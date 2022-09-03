import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        {/* trzy puste spany do hamburgera */}
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">YourPlaces</Link>
      </h1>
      <nav>
        {/* navLink później */}
        ...
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
