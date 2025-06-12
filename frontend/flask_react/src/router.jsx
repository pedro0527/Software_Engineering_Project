import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Reservation } from "./pages/Reservation/Reservation";
import { ReservationDetail } from "./pages/Reservation/ReservationDetail";
import { ReservationPerson } from "./pages/Reservation/ReservationPerson";
import { ReservationCheck } from "./pages/Reservation/ReservationCheck";
import MyReservations from "./pages/MyReservations";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/reservation", element: <Reservation /> },
  { path: "/reservation/:id", element: <ReservationDetail /> },
  { path: "/person", element: <ReservationPerson /> },
  { path: "/check", element: <ReservationCheck /> },
  { path: "/my-reservations", element: <MyReservations /> },
]);
