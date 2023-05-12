import axios from "axios"

const devEnv = process.env.NODE_ENV !== "production"

const API = axios.create({baseURL:`${devEnv ? process.env.REACT_APP_LOCALHOST_API : process.env.REACT_APP_PROD_API}`})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})

export function log_In(formData){
    return API.post("/auth/login",formData)
}

export function sign_Up(formData){
    return API.post("/auth/signup",formData)
}

export function google_Sign(formData){
    return API.post("/auth/google",formData)
}

export function like_Movie(movie){
    return API.put("/auth/like",movie)
}

export function get_Like_Movie(){
    return API.get("/auth/getLike")
}