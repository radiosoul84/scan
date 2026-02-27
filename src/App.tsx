import "./App.css";
import Header from "./components/header/header";
import Layout from "./components/layout/layout";
import MainPage from "./components/mainPage/mainPage";
import LoginForm from "./components/loginForm/loginForm";
import SearchForm from "./components/searchForm/searchForm";
import Histogram from "./components/Histohram/histogram";
import Footer from "./components/footer/footer";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { useAppSelector, useAppDispatch } from "./helpers/hooks";
import { useEffect } from "react";
import { checkUserAuthorization } from "./redux/userSlice";

function App() {
  const { isAuthorized, isFirstLoad } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuthorization());
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginForm />} />
          <Route
            path="search"
            element={
              <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
                <SearchForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="result"
            element={
              <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
                <Histogram />
              </ProtectedRoute>
            }
          />
          <Route
            path="tariffs"
            element={
              <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
                (<p>Страница в разработке</p>)
              </ProtectedRoute>
            }
          />
          <Route
            path="faq"
            element={
              <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
                (<p>FAQ в разработке</p>)
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>404 page not found</p>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
