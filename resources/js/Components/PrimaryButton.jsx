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
                `inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
                 ${ color === 'green' ? 'bg-green hover:bg-green-2 focus:ring-green focus:bg-green-2 active:bg-green-900' : color === 'yellow' ? 'bg-yellow hover:bg-yellow-2 focus:bg-yellow-2 focus:ring-yellow active:bg-yellow-900' : color === 'blue' ? 'bg-blue hover:bg-blue-2 active:bg-blue-900 focus:bg-blue-2 focus:ring-blue' : 'bg-gray-800 hover:bg-gray-700 focus:ring-indigo-500 focus:bg-gray-700'} 
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
