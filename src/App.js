import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthCheck from "./hooks/useAuthCheck";
import PagesRoutes from "./pages/Routes/PagesRoutes";

function App() {
  const authCheck = useAuthCheck();
  return authCheck ? (
    <>
      <PagesRoutes />
      <ToastContainer />
    </>
  ) : (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          xmlSpace="preserve"
          className="animate-spin w-20 h-20"
        >
          <path
            fill="#fff"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          ></path>
        </svg>
        <p className="text-2xl font-bold">Checking Authentication...</p>
      </div>
    </div>
  );
}

export default App;
