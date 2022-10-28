import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import Home from "../pages";

const Layout = () => {
  return (
    <div>
      {/* <Navbar className={styles.main} /> */}
      <Home />
      {/* <Footer className={styles.footer} /> */}
    </div>
  );
};

export default Layout;
