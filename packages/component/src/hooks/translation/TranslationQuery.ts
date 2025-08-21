import { GraphQLQueryClass } from "@hooks/query/useGraphqlQuery";

export class TranslationQuery implements GraphQLQueryClass<Translation> {
    public queryKey: string = 'App.TranslationQuery'

    public gql: string = `
        query ($lang: String, $appName: String){
            translations (
                filter: { 
                    data: { 
                        language: { descriptorKey: $lang },
                        appName: {
                            descriptorKey_among: ["*", $appName]
                        },
                    } 
                }
            ) {
                data { 
                    translationKey value
                }
            }
        }
    `
    
    public variables?: Record<string, any> | undefined;

    constructor(lang: string) {
        this.variables = {
            lang: lang,
            appName: process.env.REACT_APP_NAME
        }
    }

    public mapFn(data?: Record<string, any>): Translation {
        return data
            ?.translations
            ?.data
            ?.reduce((all: Translation, item: {translationKey: string, value: string}): Translation => ({ ...all, [item.translationKey.trim()]: item.value }), {}) 
            || {}
    };
}

export type Translation = {
    [key: string]: string
}
