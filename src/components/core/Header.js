import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "../../Context";
import auth from "../../auth/auth-helper";

import "./Header.css";

const Header = () => {
  let history = useHistory();
  const { itemTotal, isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleSignout = (event) => {
    userHasAuthenticated(false);
    auth.clearJWT();
    history.push("/")
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top headernav">
        <Link className="navbar-brand" to="/">
          FocusedMode
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapse"
          aria-controls="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapse">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated && (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/todos">
                    To-do List
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/pomodoros">
                    Pomodoro
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/stats">
                    Stats
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="form-inline my-2 my-lg-0">
            {isAuthenticated && (
              <>
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  onClick={handleSignout}
                  type="submit"
                >
                  SIGN OUT
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link className="btn btn-success mr-sm-2" to="/signin">
                  SIGN IN
                </Link>
                <Link className="btn btn-success mr-sm-2" to="/signup">
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
