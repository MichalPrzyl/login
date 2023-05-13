import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import CreateRecord from './createNew';
import hasJWT, { setAuthToken } from './token';
import './style.css'
import DisplayData from '../data/DisplayData';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoginForm from './loginForm';

interface ICredentials {
    username: string;
    password: string;
}

const Access = () => {
    const [credentials, setCredentials] = useState({} as ICredentials);
    const [logged, setLogged] = useState(false);
    const [data, setData] = useState([] as any)
    const [token, setToken] = useState("")
    const [loggedUsername, setLoggedUsername] = useState('');

    useEffect(() => {
        checkIfLogin();
        const usedToken = localStorage.getItem("token")
        if (usedToken) {
            setAuthToken(usedToken);
        }
    })

    useEffect(() => {
        setAuthToken(token);
        checkIfLogin();
    }, [token])

    const checkIfLogin = () => {
        const hasPermission = hasJWT()
        if (hasPermission) {
            setLogged(true);
        }
        else {
            setLogged(false);
        }
    }
    const cleanCredentialInputs = () => {
        setLoggedUsername(credentials.username);
        setCredentials({ username: '', password: '' })
    }
    const getToken = async () => {
        const url = 'http://127.0.0.1:8000/api/token/'

        const sendState = {
            username: credentials.username,
            password: credentials.password
        }
        try {
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
        catch { }

    }

    const handleChangeusername = (e: any) => {
        setCredentials({ ...credentials, username: e.target.value })
    }

    const handleChangePassword = (e: any) => {
        setCredentials({ ...credentials, password: e.target.value })
    }

    const logout = () => {
        localStorage.removeItem('token')
        setAuthToken(null);
        checkIfLogin();
        setData([]);
    }

    const getData = async () => {
        const url = 'http://127.0.0.1:8000/language'
        try {
            const response = await axios.get(url)
            setData(response.data)
        }
        catch { }
    }

    return (
        <div className='app'>


            <LoginForm
                logged={logged}
                credentials={credentials}
                handleChangeusername={handleChangeusername}
                handleChangePassword={handleChangePassword}
                getToken={getToken}
                loggedUsername={loggedUsername}
                logout={logout}
            />


            {logged &&
                <Button onClick={getData}>Pobierz dane</    Button>
            }
            <div>Dane:</div>
            <div>
                <DisplayData data={data} />

            </div>



            <CreateRecord />
        </div>
    )
}

export default Access;