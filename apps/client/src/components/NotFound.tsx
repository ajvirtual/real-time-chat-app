import { useTranslations } from "@chat/component";
import { ClientError } from "./ClientError";
import { useCallback, useState } from "react";

const ErrorPage = () => {
    const [, updateState] = useState<unknown>();

    const [SUBTITLE, DESCRIPTION] = useTranslations(i18n);

    const forceUpdate = useCallback(() => updateState({}), []);

    return (
        <ClientError
            title={404}
            subtitle={SUBTITLE}
            message={DESCRIPTION}
            onRetryClick={() => forceUpdate()}
        />
    );
};

export default ErrorPage;

const i18n = ["std_error_404", "std_error_404_description"];
