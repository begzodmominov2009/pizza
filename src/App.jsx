import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AllPage from "./module/all-page/AllPage";

const HomePage = React.lazy(() => import("./module/home/HomePage"));
const CartPage = React.lazy(() => import("./module/Cart/CartPage"));
const ProfilePage = React.lazy(() => import("./module/profile/ProfilePage"))


const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="all" element={<AllPage/>}/>
          </Route>
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
