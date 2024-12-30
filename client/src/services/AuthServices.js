import axios from "axios"

const AuthInstance = axios.create({
    baseURL: "http://localhost:8080/auth/"
})

export const registerAPI = async ({ requestData }) => {
    try {
        const { data, status } = await AuthInstance.post("register", requestData)
        return { data, status }
    } catch (error) {
        console.log(error, "::AXIOS ERROR")
        throw new Error(error)
    }
}