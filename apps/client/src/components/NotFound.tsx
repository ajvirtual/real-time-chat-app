import { ClientError } from "./ClientError";
import { useCallback, useState } from "react";

const ErrorPage = () => {
    const [, updateState] = useState<unknown>();

    const forceUpdate = useCallback(() => updateState({}), []);

    return (
        <ClientError
            title={404}
            subtitle={"Page Not Found"}
            message={"Sorry, the page you are looking for does not exist."}
            onRetryClick={() => forceUpdate()}
        />
    );
};

export default ErrorPage;

const i18n = ["std_error_404", "std_error_404_description"];
