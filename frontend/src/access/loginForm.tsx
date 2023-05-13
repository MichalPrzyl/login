import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = (props: any) => {
    const {logged, credentials, handleChangeusername, handleChangePassword,
        getToken, loggedUsername, logout} = props;

    return (<>
        {!logged ?
            <>
                <Form.Label htmlFor="inputPassword5">Username</Form.Label>
                <Form.Control
                    type="text"
                    id="inputPassword5"
                    value={credentials.username || ''}
                    onChange={handleChangeusername}
                />
                <Form.Label htmlFor="inputPassword5">Hasło</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    value={credentials.password || ''}
                    onChange={handleChangePassword}
                />
                <Button onClick={getToken}>Zaloguj</Button>
            </>
            : <>
                <div>zalogowane jako: {loggedUsername}</div>
                <Button onClick={logout}>Wyloguj</Button>
            </>
        }
        </>
    )
}

export default LoginForm;