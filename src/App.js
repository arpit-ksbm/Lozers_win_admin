import { Route, BrowserRouter as Router, Routes, useNavigate, useRoutes } from "react-router-dom";
import PrivateRoutes from "./utils/private-routes";
import { useEffect, useState } from "react";
import * as AuthActions from './redux/actions/authAction';

import Login from './pages/login';

//! Dahboard
import Dashboard from "./pages/dashboard";

//! Customer
import Player from "./pages/player";
import AddPlayer from "./pages/player/add-player";

//! Game History
import GameHistoryFunTargetTimer from "./pages/game-history/fun-target-timer";
import GameHistoryFunSoratTimer from "./pages/game-history/fun-sorat-game";
import GameHistoryPrologicTimer from "./pages/game-history/prologic777";

//! Current Game
import CurrentGameFunTargetTimer from "./pages/current-game/fun-target-timer";
import CurrentGameFunSoratTimer from "./pages/current-game/fun-sorat-timer";
import CurrentGamePrologicTimer from "./pages/current-game/prologic-timer";

//! Payment 
import PaymentRequest from "./pages/payment/request";
import PaymentHistory from "./pages/payment/history";

//! Setting 
import Subadmin from "./pages/setting/sub-admin";
import AddSubadmin from "./pages/setting/sub-admin/add-sub-admin";
import ChangePassword from "./pages/setting/change-password";
import Settings from "./pages/setting/settings";
import { useDispatch, useSelector } from "react-redux";
import Contest from "./pages/contest";
import Users from "./pages/user";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/", element: <PrivateRoutes />, children: [
      { path: "/", element: <Dashboard />, name: "Dashboard" },
      { path: "*", element: <> Not Ready </> },

      // Customer
      { path: "/admin/player", element: <Player />, name: "Player" },
      { path: "/admin/player/add-player", element: <AddPlayer mode="Add" />, name: "Player" },
      { path: "/admin/player/Edit-player", element: <AddPlayer mode="Edit" />, name: "Player" },
      
      { path: "/admin/contest", element: <Contest />, name: "Contest" },
      { path: "/admin/users", element: <Users />, name: "Users" },
      // Game History
      { path: "/admin/game-history/fun-target-timer", element: <GameHistoryFunTargetTimer />, name: "Game History" },
      { path: "/admin/game-history/fun-sorat-timer", element: <GameHistoryFunSoratTimer />, name: "Game History" },
      { path: "/admin/game-history/astro-777", element: <GameHistoryPrologicTimer />, name: "Game History" },

      // Current Game (not part of the permission)
      { path: "/admin/current-game/fun-target-timer", element: <CurrentGameFunTargetTimer />, name: 'Current Game' },
      { path: "/admin/current-game/fun-sorat-timer", element: <CurrentGameFunSoratTimer />, name: 'Current Game' },
      { path: "/admin/current-game/astro-777", element: <CurrentGamePrologicTimer />, name: 'Current Game' },

      // Payment (not part of the permission)
      { path: "/admin/payment/request", element: <PaymentRequest />, name: 'Payment' },
      { path: "/admin/payment/history", element: <PaymentHistory />, name: 'Payment' },

      // Settings (not part of the permission)
      { path: "/admin/setting/sub-admin", element: <Subadmin />, name: 'Setting' },
      { path: "/admin/setting/sub-admin/add-sub-admin", element: <AddSubadmin mode="Add" />, name: 'Setting' },
      { path: "/admin/setting/sub-admin/edit-sub-admin", element: <AddSubadmin mode="Edit" />, name: 'Setting' },
      { path: "/admin/setting/change-password", element: <ChangePassword />, name: 'Setting' },

      { path: "/admin/settings", element: <Settings />, name: 'Setting' },
    ]
  }
];

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminId, setAdminId] = useState('');
  useEffect(() => {
    const localAdminId = localStorage.getItem('adminId');
    localAdminId && setAdminId(localAdminId);
    //! Dispatching API 
    localAdminId && dispatch(AuthActions.getAdminDetail({ data: { id: localAdminId }, navigate }));
  }, [adminId]);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<> Not Ready</>} />

          {/* Customer */}
          <Route path="/admin/player" element={<Player />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/contest" element={<Contest />} />
          <Route path="/admin/player/add-player" element={<AddPlayer mode={'Add'} />} />
          <Route path="/admin/player/Edit-player" element={<AddPlayer mode={'Edit'} />} />

          {/* Game History */}
          <Route path="/admin/game-history/fun-target-timer" element={<GameHistoryFunTargetTimer />} />
          <Route path="/admin/game-history/fun-sorat-timer" element={<GameHistoryFunSoratTimer />} />
          <Route path="/admin/game-history/astro-777" element={<GameHistoryPrologicTimer />} />

          {/* Current Game */}
          <Route path="/admin/current-game/fun-target-timer" element={<CurrentGameFunTargetTimer />} />
          <Route path="/admin/current-game/fun-sorat-timer" element={<CurrentGameFunSoratTimer />} />
          <Route path="/admin/current-game/astro-777" element={<CurrentGamePrologicTimer />} />

          {/* Payment */}
          <Route path="/admin/payment/request" element={<PaymentRequest />} />
          <Route path="/admin/payment/history" element={<PaymentHistory />} />

          {/* Setting */}
          <Route path="/admin/setting/sub-admin" element={<Subadmin />} />
          <Route path="/admin/setting/sub-admin/add-sub-admin" element={<AddSubadmin mode={'Add'} />} />
          <Route path="/admin/setting/sub-admin/edit-sub-admin" element={<AddSubadmin mode={'Edit'} />} />
          <Route path="/admin/setting/change-password" element={<ChangePassword />} />

          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center" // Or "bottom-center" for bottom-center
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;