import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Gamepad, PaymentOutlined, Person, Settings } from "@mui/icons-material";
import GamepadIcon from '@mui/icons-material/Gamepad';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';

export const RouteName = [
    {
        path: "/",
        name: "Dashboard",
        icon: <HomeIcon />,
    },
    {
        path: "/admin/player",
        name: "Player",
        icon: <Person />,
    },
    {
        path: "/admin/users",
        name: "Users",
        icon: <Person />,
    },
    {
        path: "/admin/contest",
        name: "Contest",
        icon: <GamepadIcon />,
    },
    {
        path: "/admin/points-distribution",
        name: "Point Distribution",
        icon: <ScoreboardIcon />,
    },
    {
        name: "Game History",
        icon: <SportsEsportsIcon />,
        subRoutes: [
            {
                path: "/admin/game-history/fun-target-timer",
                name: "Fun Target Timer",
                icon: <SportsEsportsIcon />,
            },
            {
                path: "/admin/game-history/fun-sorat-timer",
                name: "Fun Sorat Timer",
                icon: <SportsEsportsIcon />,
            },
            {
                path: "/admin/game-history/astro-777",
                name: "Astro 777",
                icon: <SportsEsportsIcon />,
            },
        ],
    },
    {
        name: "Current Game",
        icon: <Gamepad />,
        subRoutes: [
            {
                path: "/admin/current-game/fun-target-timer",
                name: "Fun Target Timer",
                icon: <Gamepad />,
            },
            {
                path: "/admin/current-game/fun-sorat-timer",
                name: "Fun Sorat Timer",
                icon: <Gamepad />,
            },
            {
                path: "/admin/current-game/astro-777",
                name: "Astro 777",
                icon: <Gamepad />,
            }
        ],
    },
    {
        name: "Payment",
        icon: <PaymentOutlined />,
        subRoutes: [
            {
                path: "/admin/payment/request",
                name: "Request",
                icon: <PaymentOutlined />,
            },
            {
                path: "/admin/payment/history",
                name: "History",
                icon: <PaymentOutlined />,
            }
        ],
    },
    {
        name: "Setting",
        icon: <Settings />,
        subRoutes: [
            {
                path: "/admin/setting/sub-admin",
                name: "Sub Admin",
                icon: <Settings />,
            },
            {
                path: "/admin/setting/change-password",
                name: "Change Password",
                icon: <Settings />,
            },
            {
                path: "/admin/settings",
                name: "Settings",
                icon: <Settings />,
            }
        ],
    }
];