export default function PrimaryButton({
    className = '',
    disabled,
    color,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900
                 ${ color === 'green' ? 'bg-green hover:bg-green-2' : color === 'yellow' ? 'bg-yellow hover:bg-yellow-2' : 'bg-gray-800 hover:bg-gray-700'} 
                 text-white ring-1 ring-transparent hover:text-white ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
