export const getCountryCode = (countryName: string) => {
    return countryDictonnary[countryName]
}

const countryDictonnary = {
    "Malagasy": "MG",
}