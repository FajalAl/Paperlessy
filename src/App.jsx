import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import Crypto1 from "./pages/Crypto1";
import HomePage from "./pages/HomePage";
import HomePageEnterPhoneNumber from "./pages/HomePageEnterPhoneNumber";
import Login from "./pages/Login";
import Receipts from "./pages/Receipts";
import Response1 from "./pages/Response1";
import Response2 from "./pages/Response2";
import SignUp from "./pages/SignUp";
import SomePage from "./pages/SomePage";
import TaxInvoice from "./pages/TaxInvoice";
import Transact from "./pages/Transact";
import UploadFile from "./pages/UploadFile";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/transact":
        title = "";
        metaDescription = "";
        break;
      case "/home-page-enter-phone-number":
        title = "";
        metaDescription = "";
        break;
      case "/response1":
        title = "";
        metaDescription = "";
        break;
      case "/tax-invoice":
        title = "";
        metaDescription = "";
        break;
      case "/signup":
        title = "";
        metaDescription = "";
        break;
      case "/response":
        title = "";
        metaDescription = "";
        break;
      case "/receipts":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/crypto":
        title = "";
        metaDescription = "";
        break;
        case "/somepage":
        title = "";
        metaDescription = "";
        break;
      case "/uploadfile":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/transact" element={<Transact />} />
      <Route path="/homepage2" element={<HomePage />} />
      <Route
        path="/home-page-enter-phone-number"
        element={<HomePageEnterPhoneNumber />}
      />
      <Route path="/response1" element={<Response2 />} />
      <Route path="/tax-invoice" element={<TaxInvoice />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/response" element={<Response1 />} />
      <Route path="/receipts" element={<Receipts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crypto" element={<Crypto1 />} />
      <Route path="/uploadfile" element={<UploadFile />} />
      <Route path="/somepage" element={<SomePage />} />
    </Routes>
  );
}
export default App;
