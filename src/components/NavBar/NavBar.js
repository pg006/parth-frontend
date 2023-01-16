import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png'

const NavBar = () => {
  return (
    <React.Fragment>
      <div className="fixed bg-white w-screen">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-2 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to='/'>
                <span className="sr-only">SPACEX</span>
                {/* <h1 className="lg:text-3xl md:text-2xl sm:text-2xl w-auto sm:h-10"> SPACEX</h1> */}
                <img
                className="lg:h-12 md:h-10 w-auto sm:h-10 h-10"
                src={logo}
                alt="logo"
              />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
