import { useState } from "react";
import { fetchDataToken } from "../utils";
import { useNavigate } from "react-router-dom";


const LoginAdmin = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault() 
        fetchDataToken('user/signin', 'POST', { userEmail, password }, (res) => {
            if (res?.status === 'SUCCESS') {
                localStorage.setItem('token', res.token)
                navigate('/admin')
            } else {
                setError(res?.message || 'Ошибка при входе')
            }
        })
    }
    return (
        <div>
            <div className="padd-top-100px">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}/>
                    <input type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Войти</button>
                </form>
                {error && <p className="text-red">{error}</p>}
            </div>
        </div>
    )
}

export default LoginAdmin;