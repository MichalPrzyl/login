import axios from 'axios';

export default function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("token") ? flag=true : flag=false
   
    return flag
}


export function setAuthToken(token: any) {
 
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}