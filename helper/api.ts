// axios -> komunikasi dengan backend

import axios from "axios";

const config = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "APP-KEY": process.env.APP_KEY
    }
})

export default config;