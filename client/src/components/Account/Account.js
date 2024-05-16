// Account.jsx
import { React, useState, useEffect } from "react";
// import AccountSidebar from "./AccountSidebar";
import { Favorites, Orders, UserInfo } from "./../index.js";
import styles from "./Account.module.css";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { BiBox } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  const current = window.location.pathname.split("/")[2];
  const [selectedTab, setSelectedTab] = useState(
    current === "userInfo"
      ? "userInfo"
      : current === "favorites"
      ? "favorites"
      : "orders"
  );
  const [showTab, setShowTab] = useState(true);

  return (
    <div className={styles.sidebar}>
      <div className={styles.titleWrapper}>
        <FaUser className={styles.userIcon} />
        {showTab && <h2 className={styles.sidebarTitle}>Account</h2>}
      </div>
      <ul className={styles.sidebarList}>
        <li
          className={
            styles.tab + " " + (selectedTab === "userInfo" ? styles.active : "")
          }
          onClick={() => setSelectedTab("userInfo")}
        >
          <CgProfile className={styles.tabIcon} />
          {showTab && <Link to="/account/userInfo">User Info</Link>}
        </li>
        <li
          className={
            styles.tab +
            " " +
            (selectedTab === "favorites" ? styles.active : "")
          }
          onClick={() => setSelectedTab("favorites")}
        >
          <MdFavoriteBorder className={styles.tabIcon} />
          {showTab && <Link to="/account/favorites">Favorites</Link>}
        </li>
        <li
          className={
            styles.tab + " " + (selectedTab === "orders" ? styles.active : "")
          }
          onClick={() => setSelectedTab("orders")}
        >
          <BiBox className={styles.tabIcon} />
          {showTab && <Link to="/account/orders">Orders</Link>}
        </li>
      </ul>
    </div>
  );
};

const Account = () => {
  // get current user
  const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:9000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.document);
        return data;
      });
  }, []);

  // redirect to userInfo page by default
  if (window.location.pathname.includes("account")) {
    // window.location.href = "/account/userInfo";
  }

  console.log(user);
  return (
    <div className={styles.account}>
      <Sidebar />
      <Routes>
        <Route path="userInfo" element={<UserInfo user={user} />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

// const Account = () => {
//   return (
//     <div className={styles.accountPage}>
//       <AccountSidebar />
//     </div>
//   );
// };

export default Account;
