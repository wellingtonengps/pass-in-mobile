import axios from "axios"

export const api = axios.create({
    baseURL: "http://192.168.15.3:8080"
})

api.get("")