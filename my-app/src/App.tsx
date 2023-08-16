import React from "react";
import "./scss/app.scss";

import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./components/FullPizza/FullPizza";
import MainLayout from "./loyouts/MainLayout";

// export const SearchContext = React.createContext();

// function Parrent({ children }) {
//   //  <Outlet /> в новом реакт роутере нельзя применять children вместо этого  Outlet
//   return (
//     <div>
//       <h1>Заголовок</h1>
//       {children} // любой jsx подставляем
//     </div>
//   );
// }

function App() {
  // const [searchValue, setSearchValue] = useState(""); // закоментированный пример с контекстом

  return (
    // <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    // </SearchContext.Provider>
  );
}

export default App;

// import React from "react";
// import "./scss/app.scss";
// import Header from "../src/components/Header";
// import { Routes, Route } from "react-router-dom";

// const HomePage = React.lazy(() => import("./pages/Home"));
// const CardPage = React.lazy(() => import("./pages/Cart"));
// const NotFound = React.lazy(() => import("./pages/NotFound"));

// function App() {
//   return (
//     <div className="wrapper">
//       <Header />
//       <div className="content">
//         <div className="container">
//           <Routes>
//             <Route path="/" element={<HomePage />}></Route>
//             <Route path="/cart" element={<CardPage />}></Route>
//             <Route path="*" element={<NotFound />}></Route>
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
