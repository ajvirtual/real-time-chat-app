import { AjaxResponseType } from "@chat/lib";
import { useAjax } from "@hooks/ajax";
import { useMzMutation } from "@hooks/query";

export const useLoggingMutation = () => {
    const ajax = useAjax();

    return useMzMutation<AjaxResponseType>((payload: Record<string, any>) =>
        ajax.send({
            type: "POST",
            url: "log",
            content_type: "application/json",
            data: payload,
        })
    );
};