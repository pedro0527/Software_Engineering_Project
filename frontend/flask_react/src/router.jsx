import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Reservation } from "./pages/Reservation/Reservation";
import { ReservationDetail } from "./pages/Reservation/ReservationDetail";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/reservation", element: <Reservation /> },
  { path: "/reservation/:id", element: <ReservationDetail /> },
]);
