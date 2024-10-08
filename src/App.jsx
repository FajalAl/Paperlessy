import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import ParentComponent from "./components/ParentComponent";
import Crypto1 from "./pages/Crypto1";
import HomePage from "./pages/HomePage";
import HomePageEnterPhoneNumber from "./pages/HomePageEnterPhoneNumber";
import Login from "./pages/Login";
import Receipt from "./pages/Receipt";
import ResetPassword from "./pages/ResetPassword";
import Response1 from "./pages/Response1";
import Response2 from "./pages/Response2";
import SignUp from "./pages/SignUp";
import SomePage from "./pages/SomePage";
//import TaxInvoice from "./pages/TaxInvoice";
import Transact from "./pages/Transact";
import TransactionHistory from "./pages/TransactionHistory";
import UploadFile from "./pages/UploadFile";
import UserReceipt from "./pages/UserReceipt";


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
        case "/homepage":
          title = "";
          metaDescription = "";
          break;
      case "/transact":
        title = "";
        metaDescription = "";
        break;
      case "/transaction-history":
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
      //case "/tax-invoice":
       // title = "";
       // metaDescription = "";
        //break;
      case "/signup":
        title = "";
        metaDescription = "";
        break;
      case "/response":
        title = "";
        metaDescription = "";
        break;
      case "/receipt":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/reset-password":
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
      case "/userreceipt":
        title = "";
        metaDescription = "";
        break;
      case "/receipt/:receiptId":
        title = "Receipt Details";
        metaDescription = "Detailed view of your receipt.";
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
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/transact" element={<Transact />} />
      <Route path="/homepage2" element={<HomePage />} />
      <Route
        path="/home-page-enter-phone-number"
        element={<HomePageEnterPhoneNumber />}
      />
      <Route path="/response1" element={<Response2 />} />
    
      <Route path="/signup" element={<SignUp />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/response" element={<Response1 />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/crypto" element={<Crypto1 />} />
      <Route path="/uploadfile" element={<UploadFile />} />s
      <Route path="/somepage" element={<SomePage />} />
      <Route path="/userreceipt" element={<UserReceipt />} />
      <Route path="/transaction-history" element={<TransactionHistory />} />
      <Route path="/receipt/:receiptId" element={<ParentComponent />} />
    </Routes>
  );
}
export default App;
