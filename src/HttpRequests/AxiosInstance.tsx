import axios from "axios";

export const ProductApi = axios.create({
    baseURL: 'https://localhost:5001/api/',
});