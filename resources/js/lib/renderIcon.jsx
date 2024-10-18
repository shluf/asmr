import { Home, LineChart, Settings, ShoppingCart, User } from 'lucide-react';
import React from 'react'

const renderIcon = (keyword) => {
switch (keyword) {
    case 'home':
    return <Home className="h-4 w-4" />;
    case 'settings':
    return <Settings className="h-4 w-4" />;
    case 'user':
    return <User className="h-4 w-4" />;
    case 'linechart':
    return <LineChart className="h-4 w-4" />;
    case 'shoppingchart':
    return <ShoppingCart className="h-4 w-4" />;
    default:
    return null;
}
}


export default renderIcon