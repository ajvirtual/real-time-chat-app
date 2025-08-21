export const checkGoogleOAuthToken = async (token: string) => {
    return await fetch(
        `https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=${token}`, {
            method: "GET",
        }
    )
}

export const getGoogleUserInfo = async (token: string) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`, {
            method: "GET"
        }
    )

    return await response.json()
}