import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { myAccount } from "../../api/user";
import filterBySearch from "../../wrappers/product/ProductGrid";

const IconGroup = ({ iconWhiteClass }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async (token) => {
      try {
        if (token) {
          const userData = await myAccount(token);
          console.log(userData.role);
          await setUser(userData);
          await setRole(userData.role);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(token);
  }, []);

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    window.location.reload();
    // navigate("/login-register");
  };

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          {/* <form action="#"> */}
          <input type="text" placeholder="Search" onChange={filterBySearch} />
          {/* <button className="button-search">
              <i className="pe-7s-search" />
            </button> */}
          {/* </form> */}
          {/* <TextField
            id="outlined-basic"
            placeholder="Search"
            variant="outlined"
            fullWidth
            label="Search"
          /> */}
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          {!token && (
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Login
                </Link>
              </li>
            </ul>
          )}
          {token && (
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  my account
                </Link>
              </li>

              {role != "seller-pending" && role != "client" && (
                <li>
                  <Link to={process.env.PUBLIC_URL + "/dashboard"}>
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link onClick={handleLogOutClick}>Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
