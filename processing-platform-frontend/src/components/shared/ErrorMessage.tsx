export const ErrorMessage = ({ message }: { message: string }) => {
    if (!message) return null;

    return(
        <div className="text-red-500 bg-red-50 p-2 rounded">
            {message}
        </div>
    );
};