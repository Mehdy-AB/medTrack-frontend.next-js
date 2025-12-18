import { AxiosError } from 'axios';

/**
 * Formats a backend error (usually from Django REST Framework) into a human-readable string.
 * @param error The AxiosError object
 * @param genericMessage A fallback message if no specific errors are found
 * @returns A formatted string or the fallback message
 */
export const formatAxiosError = (error: any, genericMessage: string = 'Une erreur est survenue'): string => {
    if (!error) return genericMessage;

    // Handle standard AxiosError
    const axiosError = error as AxiosError;

    if (axiosError.response?.data) {
        const data = axiosError.response.data as any;

        // If it's a direct string detail (e.g. { "detail": "..." })
        if (data.detail && typeof data.detail === 'string') {
            return data.detail;
        }

        // If it's a 400 Bad Request with field errors
        if (typeof data === 'object') {
            const errorMessages: string[] = [];

            for (const [key, value] of Object.entries(data)) {
                // Skip non-field fields if we have specific ones
                const fieldName = key === 'non_field_errors' ? '' : `${key}: `;

                if (Array.isArray(value)) {
                    errorMessages.push(`${fieldName}${value.join(', ')}`);
                } else if (typeof value === 'string') {
                    errorMessages.push(`${fieldName}${value}`);
                } else if (typeof value === 'object' && value !== null) {
                    // Handle nested objects recursively if needed, but for now just stringify
                    errorMessages.push(`${fieldName}${JSON.stringify(value)}`);
                }
            }

            if (errorMessages.length > 0) {
                return errorMessages.join('\n');
            }
        }
    }

    // Handle network errors or other issues
    if (axiosError.message) {
        return axiosError.message;
    }

    return genericMessage;
};
