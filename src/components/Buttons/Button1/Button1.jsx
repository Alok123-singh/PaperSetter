import React from "react";

function Button1({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button type={type} className={`bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded focus:ring-4 focus:outline focus:ring-slate-600 dark:focus:ring-slate-400   ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button1;