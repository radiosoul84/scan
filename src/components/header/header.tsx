import styles from "./header.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/menu";
import { useAppSelector, useAppDispatch } from "../../helpers/hooks";
import { logout, getUserInfo } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";

export default function Header() {
  const [isMobile, setIsMobile] = useState<boolean>(innerWidth <= 745);
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const handleMobileSize = () => {
    setIsMobile(innerWidth <= 745);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    handleMobileSize();

    window.addEventListener("resize", handleMobileSize);

    return () => {
      window.removeEventListener("resize", handleMobileSize);
    };
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getUserInfo());
    }
  }, [isAuthorized, dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Link className={styles.link} to={"/"}>
            <img className={styles.image} src="./SCAN_logo.png" alt="logo" />
          </Link>
        </div>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li>
              <Link className={styles.link} to={"/"}>
                Главная
              </Link>
            </li>
            <li>
              <Link className={styles.link} to={"/tariffs"}>
                Тарифы
              </Link>
            </li>
            <li>
              <Link className={styles.link} to={"/faq"}>
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.panelContainer}>
          {isAuthorized ? (
            <>
              <div className={styles.userInfoContainer}>
                <div className={styles.infoPanel}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <p className={`${styles.text} ${styles.usedText}`}>
                        Использовано компаний
                      </p>
                      <p className={`${styles.text} ${styles.limitText}`}>
                        Лимит по компаниям
                      </p>
                      <p className={`${styles.numbers} ${styles.used}`}>
                        {userInfo.usedCompanyCount}
                      </p>
                      <p className={`${styles.numbers} ${styles.limit}`}>
                        {userInfo.companyLimit}
                      </p>
                    </>
                  )}
                </div>
                <div className={styles.logoutGroup}>
                  <div className={styles.wrapper}>
                    <p className={styles.username}>Eugeny T.</p>
                    <button
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      Выйти
                    </button>
                  </div>
                  <img
                    className={styles.userImg}
                    src="./user.png"
                    alt="user avatar"
                  />
                </div>
                {isMobile && <Menu />}
              </div>
            </>
          ) : (
            <>
              <div className={styles.loginPanel}>
                <Link
                  to={"/register"}
                  className={`${styles.authLink} ${styles.registerLink}`}
                >
                  Зарегистрироваться
                </Link>
                <div className={styles.divider}></div>
                <Link to={"/login"} className={styles.authLink}>
                  Войти
                </Link>
              </div>
              {isMobile && <Menu />}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
