import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const DisplayData = (props: any) => {
    const { data, getData } = props;

    const handleRemove = async (id: number) => {
        const url = `http://127.0.0.1:8000/language/${id}`
        await axios.delete(url)
        getData();
    }

    return <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Usuń</th>
                </tr>
            </thead>

            <tbody>

                {data?.map((el: any) => (
                    <tr key={el.id}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td><Button
                            variant="danger"
                            onClick={() => handleRemove(el.id)}
                            className='custom-rmv-btn'
                        >Usuń</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}
export default DisplayData;