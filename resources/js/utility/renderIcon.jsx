import {
    Home,
    LineChart,
    Settings,
    ShoppingCart,
    User,
    User2,
    ShieldCheck,
} from "lucide-react";
import React from "react";
import { UserFilled } from "./svg-icons";

const renderIcon = (keyword, size) => {
    switch (keyword) {
        case "home":
            return <Home className={`h-${size} w-${size}`} />;
        case "settings":
            return <Settings className={`h-${size} w-${size}`} />;
        case "user":
            return <User className={`h-${size} w-${size}`} />;
        case "user-filled":
            return <UserFilled className={`h-${size} w-${size}`} />;
        case "linechart":
            return <LineChart className={`h-${size} w-${size}`} />;
        case "shoppingchart":
            return <ShoppingCart className={`h-${size} w-${size}`} />;
        case "shield-check":
            return <ShieldCheck className={`h-${size} w-${size}`} />;
        default:
            return null;
    }
};

export default renderIcon;
