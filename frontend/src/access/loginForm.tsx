import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = (props: any) => {
    const { logged, credentials, handleChangeusername, handleChangePassword,
        getToken, loggedUsername, logout, loginError, setLoginError } = props;

    return (<div className="login-form p-2">
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
                <div className='login-errors'>
                    {loginError}
                </div>
                <Button className='mt-2' onClick={getToken}>Zaloguj</Button>
            </>
            : <>
                <div>zalogowane jako: {loggedUsername}</div>
                <Button onClick={logout}>Wyloguj</Button>
            </>
        }
    </div>
    )
}

export default LoginForm;
