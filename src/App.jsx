import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Product from "./pages/Product";
import Home from "./pages/Home";
import Principal from "./pages/Principal";
import Header from "./components/Header.jsx";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout"; 

import PageTransition from "./components/PageTransition.jsx";

import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

function Layout({ children, setSearch }) {
  return (
    <>
      <Header setSearch={setSearch} />
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
}

function AppRoutes({ search, setSearch }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>

       <Route
  path="/"
  element={
    <Layout setSearch={setSearch}>
      <Principal search={search} />
    </Layout>
  }
/>
        <Route
          path="/produtos"
          element={
            <Layout setSearch={setSearch}>
              <Home search={search} />
            </Layout>
          }
        />

        <Route
          path="/product/:id"
          element={
            <Layout setSearch={setSearch}>
              <Product />
            </Layout>
          }
        />

        <Route
          path="/favoritos"
          element={
            <Layout setSearch={setSearch}>
              <Favorites />
            </Layout>
          }
        />

        {/* ✅ NOVA ROTA CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <Layout setSearch={setSearch}>
              <Checkout />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [search, setSearch] = useState("");

  return (
    <FavoritesProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes
            search={search}
            setSearch={setSearch}
          />
        </BrowserRouter>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;