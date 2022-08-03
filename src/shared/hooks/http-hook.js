import { useState, useCallback, useRef, useEffect } from "react"

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    useCallback(() => {
        const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);
            const httpAbortController = new AbortController();
            activeHttpRequests.current.push(httpAbortController);
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortController.signal
                });
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(response.message);
                }

                return responseData;

            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }
    }, [])

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        setError
    }
}