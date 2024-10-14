import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    color,
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-${color} ` +
                (active
                    ? `bg-muted text-${color}`
                    : 'text-muted-foreground') +
                className
            }
        >
            {children}
        </Link>
    );
}
