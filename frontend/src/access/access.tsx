import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import CreateRecord from './createNew';
import hasJWT, { setAuthToken } from './token';
import './style.css'


interface ICredentials{
    username: string;
    password: string;
}

const Access = () =>{
    const [credentials, setCredentials] = useState({} as ICredentials);
    const [logged, setLogged] = useState(false);
    const [data, setData] = useState([] as any)
    const [token, setToken] = useState("")

    useEffect(() => {
        checkIfLogin();
        const usedToken = localStorage.getItem("token")
        if (usedToken){
            setAuthToken(usedToken);
        }
    })

    useEffect(() => {
        setAuthToken(token);
        checkIfLogin();
    }, [token])

    const checkIfLogin = () => {
        const hasPermission = hasJWT()
        if (hasPermission){
            setLogged(true);
        }
        else{
            setLogged(false);
        }
    }
    const cleanCredentialInputs = () =>{
        setCredentials({username: '', password: ''})
    }
    const getToken = async () => {
        const url = 'http://127.0.0.1:8000/api/token/'

        const sendState = {
            username: credentials.username,
            password: credentials.password
        }
        try{
            cleanCredentialInputs();
            const response = await axios.post(url, sendState)
            const token = response.data.access
            localStorage.setItem("token", token);
 
            //set token to axios common header
            setAuthToken(token);
            checkIfLogin();
            setToken(token);
            getData();
        }
        catch {}
        
    }
    
    const handleChangeusername = (e: any) => {
        setCredentials({...credentials, username: e.target.value})
    } 

    const handleChangePassword = (e: any) => {
        setCredentials({...credentials, password: e.target.value})
    } 

    const logout = () =>{
        localStorage.removeItem('token')
        setAuthToken(null);
        checkIfLogin();
        setData([]);
    }

    const getData = async () =>{
        console.log('logged', logged)
        const url = 'http://127.0.0.1:8000/language'
        try{
            const response = await axios.get(url)
            console.log(response.data)
            setData(response.data)
        }
        catch{}
    }

    return (
        <div className='app'>
        {!logged ? 
        <>
        username:
            <input 
                type="text"
                value={credentials.username || ''}
                onChange={handleChangeusername}
            ></input>
            <br></br>
            Password:
            <input 
                type="password"
                value={credentials.password || ''}
                onChange={handleChangePassword}
            ></input>
            <br></br>

            <button onClick={getToken}>Zaloguj</button>
            <br></br>
        </>
        : null}
            
            {logged ? <div>zalogowane</div> : <div>nie zalogowano</div>}
            <button onClick={logout}>Wyloguj</button>
            <button onClick={getData}>Pobierz dane</button>
            <div>Dane:</div>
            <div>
                {data?.map((el: any) => (
                    <div key={el.id}>
                        <div>ID: {el.id}</div>
                        <div>NAME: {el.name}</div>
                        <div>USER: {el.user.username}</div>
                    </div>
                    ))}
            </div>
            <CreateRecord />
        </div>
    )
}

export default Access;