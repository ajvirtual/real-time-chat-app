import { Alert, AlertProps } from '../alert';
import { useTranslation } from '../../hooks/translation/useTranslation';
import Mustache from 'mustache';

export const ErrorList = (props: TProps) => {

    const t = useTranslation()

    const errorList = props.errors && 'messages' in props.errors ? props.errors.messages : [props.errors]

    return (
        <Alert
            type="danger"
            isDismissible
            {...props}
            className={`${props.className}`}
        >
            <div className="flex flex-col gap-5 p-2 pb-3">
                <ul className="list-disc">
                    {errorList?.map((error: TErrorItem, index) => (
                        <li key={index} className="">
                            <label 
                                dangerouslySetInnerHTML={{
                                    __html: Mustache.render(t(error.message), error?.data)
                                }} 
                            />
                            { 
                                error.exception && 
                                <p 
                                    className='text-white'
                                    dangerouslySetInnerHTML={{
                                        __html: t(error.exception)
                                    }}
                                />
                            }
                        </li>
                    ))}
                </ul>
                {props.children}
            </div>
        </Alert>
    )
}

type TProps = AlertProps & {
    errors?: TError
}


export type TError = { messages: Array<TErrorItem> } | TErrorItem
export type TErrorItem = { message: string, data?: any, exception?: string }
