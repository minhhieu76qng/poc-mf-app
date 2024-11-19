import React from "react";
import styles from "./Layout.module.css";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Link to="/documents">Edit</Link>
        <Link to="/sign">Sign</Link>
      </div>
      <div className={styles.body}>
        <div className={styles.header}>Header</div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
