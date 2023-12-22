import React, { useState, useEffect } from 'react';
import { TablePagination } from '../index';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdAlert } from 'react-icons/io';
import { useSpring, animated } from 'react-spring';

function ErrorBoundary(props) {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);
    const [errorInfo, setErrorInfo] = useState(null);
    const [errors, setErrors] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const getComponentName = () => {
        const currentUrl = location.pathname;
        const parts = currentUrl.split('/');
        return parts[parts.length - 1] || 'Unknown Component';
    };

    const errorIconProps = useSpring({
        to: async (next, cancel) => {
        await next({ opacity: 1, color: '#ff0000', transform: 'scale(1.2)' });
        await next({ opacity: 0.8, color: '#ff4c4c', transform: 'scale(1)' });
        },
        from: { opacity: 0, color: '#ff4c4c', transform: 'scale(1)' },
        reset: true,
    });

    useEffect(() => {
        const componentDidCatch = (event) => {
        // Access the error object from the error event
        const error = event.error || new Error('Unknown error');
        setErrorInfo(event.error);

        const errorMessage = error.message || error.toString();

        const errorDetails = {
            errorTime: new Date().toLocaleString(),
            errorMessage: errorMessage,
            errorTitle: getErrorTitle(errorMessage),
            errorCause: getErrorCause(errorMessage),
            componentName: getComponentName(),
        };

        setErrors((prevErrors) => {
            // Avoid repeating the same error message
            if (!prevErrors.some((prevError) => prevError.errorMessage === errorDetails.errorMessage)) {
            return [...prevErrors, errorDetails];
            }
            return prevErrors;
        });

        setHasError(true);
        setError(error);
        };

        const getErrorTitle = (errorMessage) => {
        const errorMessageLower = errorMessage.toLowerCase();

        switch (true) {
            case errorMessageLower.includes('fetch') && errorMessageLower.includes('failed'):
            return 'Fetch API Call Failed';
            case errorMessageLower.includes('network') && errorMessageLower.includes('error'):
            return 'Network Error';
            case errorMessageLower.includes('reference') && errorMessageLower.includes('error'):
            return 'Reference Error';
            default:
            return 'Unhandled Error';
        }
        };

        const getErrorCause = (errorMessage) => {
        const errorMessageLower = errorMessage.toLowerCase();

        switch (true) {
            case errorMessageLower.includes('fetch') || errorMessageLower.includes('Fetch'):
            return 'There could be an issue with the Fetch API call or it might be related to something else. Check the code section where you have called the Fetch API.';
            case errorMessageLower.includes('network') || errorMessageLower.includes('error'):
            return 'A network error occurred. Please check your internet connection and try again.';
            case errorMessageLower.includes('reference') || errorMessageLower.includes('error'):
            return 'An attempt to access a variable that is not declared or defined.';
            default:
            return 'Unknown cause. Please check the error message for more details.';
        }
        };

        window.addEventListener('error', componentDidCatch);

        return () => {
        window.removeEventListener('error', componentDidCatch);
        };
    }, [location]);

    const handleGoToComponent = () => {
        window.location.reload();
    };

    if (hasError) {
        const columnsDescription = [
        { header: 'Error Time', dataKey: 'errorTime' },
        { header: 'Error Title', dataKey: 'errorTitle' },
        { header: 'Error Message', dataKey: 'errorMessage', dataRender: (index, value, currentItem) => <div>{value.toString()}</div> },
        { header: 'Error Cause', dataKey: 'errorCause' },
        { header: 'Error Function', dataKey: 'componentName' },
        ];

        return (
        <div className="w-full h-screen flex justify-center items-center error-page">
            <div className="flex flex-wrap space-y-3 justify-center items-center pt-8">
            <div className="w-full flex flex-col justify-center items-center font-bold text-lg">
                <animated.div style={errorIconProps}>
                <IoMdAlert size={70} className="" />
                </animated.div>
                <h1 className="mt-4 mb-2 flex justify-center items-center text-center text-xl">Oops something went wrong. Please try again</h1>
                <button onClick={handleGoToComponent} className="bg-rose-600 border-2 border-red-700 hover:bg-blue-500 hover:border-2 hover:border-black text-white font-bold mt-4 py-2 px-4 rounded-md">
                Go to {getComponentName()}
                </button>
            </div>
            <TablePagination columnsDescription={columnsDescription} items={errors} defaultItemsPerPage={5} itemsPerPageOptions={[5, 10]} paginationEnable={false} />
            </div>
        </div>
        );
    }

    return props.children;
}

export default ErrorBoundary;
