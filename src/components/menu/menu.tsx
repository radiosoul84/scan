import "./menu.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../helpers/hooks";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BurgerMenuInterface } from "../../types/types";

export default function BurgerMenu() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleBurgerMenu = (state: BurgerMenuInterface) => {
    setIsBurgerMenuOpen(state.isOpen);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };
  return (
    <Menu
      right
      width={"100%"}
      isOpen={isBurgerMenuOpen}
      onStateChange={handleBurgerMenu}
    >
      <div className={"burgerMenuLogo"}>
        <img className={"image"} src="./logo_burger_menu.svg" alt="logo" />
      </div>
      <ul className={"burgerMenuList"}>
        <li className={"burgerMenuListItem"} onClick={closeBurgerMenu}>
          <Link className={"burgerMenuLink"} to={"/"}>
            Главная
          </Link>
        </li>
        <li className={"burgerMenuListItem"} onClick={closeBurgerMenu}>
          <Link className={"burgerMenuLink"} to={"/tariffs"}>
            Тарифы
          </Link>
        </li>
        <li className={"burgerMenuListItem"} onClick={closeBurgerMenu}>
          <Link className={"burgerMenuLink"} to={"/faq"}>
            FAQ
          </Link>
        </li>
      </ul>
      <div className={`burgerMenuButtons`}>
        {isAuthorized ? (
          <button className={"logoutButton"} onClick={handleLogout}>
            Выйти
          </button>
        ) : (
          <>
            <Link
              to={"/register"}
              className={"burgerMenuRegisterLink"}
              onClick={closeBurgerMenu}
            >
              Зарегистрироваться
            </Link>
            <Link
              to={"/login"}
              className={"burgerMenuLoginLink"}
              onClick={closeBurgerMenu}
            >
              Войти
            </Link>
          </>
        )}
      </div>
    </Menu>
  );
}
