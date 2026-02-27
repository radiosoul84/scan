import styles from "./loginForm.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  phoneNumberFormat,
  isPhoneNumber,
  isValidPhoneNumber,
} from "../../helpers/utils";
import clsx from "clsx";
import { loginUser } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [activeButton, setActiveButton] = useState("loginButton");
  const [isValid, setIsValid] = useState(false);
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [loginValue, setLoginValue] = useState("");
  const [loginError, setLoginError] = useState({
    error: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const dispatch = useAppDispatch();
  const { isAuthorized, loginServerError, isLoggingIn } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const handleButtonChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton(e.currentTarget.id);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { login: string; password: string } = {
      login: formData.get("login") as string,
      password: formData.get("password") as string,
    };
    dispatch(loginUser(data));
  };

  const validateLogin = (value: string) => {
    if (isPhoneNumber(value)) {
      if (value.length > 1 && !value.startsWith("+7")) {
        value = `+7${value.replace(/^\+?7?/, "")}`; //форматирование номера телефона
      }
      if (value.replace(/\s/g, "").length > 12 || !isValidPhoneNumber(value)) {
        setLoginError({ error: true, message: "Введите корректные данные" });
      } else {
        setLoginError({ error: false, message: "" });
      }
      setLoginValue(phoneNumberFormat(value));
    } else {
      setLoginError({ error: false, message: "" });
      setLoginValue(value);
    }
    return value.replace(/\s/g, "");
  };

  const validatePassword = (value: string) => {
    if (value.length < 1) {
      setPasswordError({ error: true, message: "Неправильный пароль" });
    } else {
      setPasswordError({ error: false, message: "" });
    }
    return value;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    let updatedValue = value;
    if (name === "login") {
      updatedValue = validateLogin(value);
    } else if (name === "password") {
      updatedValue = validatePassword(value);
    }

    setLoginData({ ...loginData, [name]: updatedValue });
  };

  useEffect(() => {
    setIsValid(
      loginData.login.length > 0 &&
        loginData.password.length > 0 &&
        !loginError.error &&
        !passwordError.error
    );
  }, [loginData, loginError, passwordError]);

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        Для оформления подписки на тариф, необходимо авторизоваться.
      </h2>
      <img className={styles.image} src="./Characters.png" alt="illustration" />

      <div className={styles.formContainer}>
        <img className={styles.icon} src="./lock.png" alt="lock" />
        <div className={styles.buttonsGroup}>
          <button
            className={clsx(styles.button, {
              [styles.buttonInactive]: activeButton !== "loginButton",
            })}
            id="loginButton"
            onClick={(e) => handleButtonChange(e)}
          >
            Войти
          </button>
          <button
            className={clsx(styles.button, {
              [styles.buttonInactive]: activeButton !== "registerButton",
            })}
            id="registerButton"
            onClick={(e) => handleButtonChange(e)}
          >
            Зарегистрироваться
          </button>
        </div>
        {activeButton === "loginButton" ? (
          <>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <label className={styles.label} htmlFor="login">
                Логин или номер телефона:
              </label>
              <input
                className={clsx(styles.input, {
                  [styles.errorInput]: loginError.error === true,
                })}
                type="text"
                id="login"
                name="login"
                onChange={handleOnChange}
                value={loginValue}
                required
              />
              <span className={styles.errorText}>{loginError.message}</span>
              <label className={styles.label} htmlFor="password">
                Пароль:
              </label>
              <input
                className={clsx(styles.input, {
                  [styles.errorInput]: passwordError.error === true,
                })}
                type="password"
                id="password"
                name="password"
                onChange={handleOnChange}
                required
              />
              <span className={styles.errorText}>{passwordError.message}</span>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={!isValid || isLoggingIn}
              >
                {isLoggingIn ? "Загрузка..." : "Войти"}
              </button>
              <span className={`${styles.errorText} ${styles.serverErrorText}`}>
                {loginServerError}
              </span>
            </form>
            <Link className={styles.restoreLink} to={"/restore"}>
              Восстановить пароль
            </Link>
            <div className={styles.alterLoginGroup}>
              <p className={styles.label}>Войти через:</p>
              <div className={styles.alterButtons}>
                <button className={styles.alterLoginButton}>
                  <img src="./google_btn.png" alt="autorize via google" />
                </button>
                <button className={styles.alterLoginButton}>
                  <img src="./facebook_btn.png" alt="autorize via facebook" />
                </button>
                <button className={styles.alterLoginButton}>
                  <img src="./yandex_btn.png" alt="autorize via yandex" />
                </button>
              </div>
            </div>{" "}
          </>
        ) : (
          <p className={styles.registerForm}>Not found</p>
        )}
      </div>
    </section>
  );
}
