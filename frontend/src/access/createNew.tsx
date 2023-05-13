import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import './style.css'


interface IData{
    name: string;
}

const CreateRecord = () => {
    const [data, setData] = useState({} as IData);

    const clearData = () =>{
        setData({name: ''})
    }

    const send = async () => {
        const sendData = {name: data.name}
        const url = 'http://127.0.0.1:8000/language'
        try{
            const response = await axios.post(url, sendData)
            clearData()
        }
        catch(error){
            console.error("Error", error)
        }
    }

    const handleChangeName = (e: any) => {
        setData({name: e.target.value})
    }

    return <div>
        <div>
            Nazwa
            <input 
                type="text" 
                value={data.name || ''}
                onChange={handleChangeName}
            ></input>
        </div>
        <div className='send-btn btn' onClick={send}>Stwórz</div>
    </div>
}
export default CreateRecord;