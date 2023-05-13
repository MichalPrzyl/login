import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import './style.css'
import Form from 'react-bootstrap/Form';
interface IData {
    name: string;
}

const CreateRecord = (props: any) => {
    const [data, setData] = useState({} as IData);

    const { getData } = props;

    const clearData = () => {
        setData({ name: '' })
    }

    const send = async () => {
        const sendData = { name: data.name }
        const url = 'http://127.0.0.1:8000/language'
        try {
            const response = await axios.post(url, sendData)
            clearData()
            getData();
        }
        catch (error) {
            console.error("Error", error)
        }
    }

    const handleChangeName = (e: any) => {
        setData({ name: e.target.value })
    }

    return <div>
        <Form.Label htmlFor="inputPassword5">Stwórz nową pozycję</Form.Label>
        <Form.Control
            type="text"
            id="inputPassword5"
            value={data.name || ''}
            onChange={handleChangeName}
            placeholder="Nazwa"
        />
        <Button className='mt-2' onClick={send}>Stwórz</Button>
    </div>
}
export default CreateRecord;
