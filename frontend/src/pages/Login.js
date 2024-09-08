import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';
import axios from 'axios'; // Import axios

function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [response, setResponse] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setToken(res.data.token); 
            setResponse('Login successful!'); 
            setError(''); 

            navigate('/DashBoard'); 
        } catch (err) {
            setError(err.response?.data?.message || err.message); 
            setResponse(''); 
            console.error(err);
        }
    };

    return (
        <>
            <main className='main'>
                <article>
                    <form onSubmit={onSubmit}>
                        <section className='inputs'>
                            <section className='input'>
                                <label>Email</label>
                                <input
                                    type='email' 
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </section>
                            <section className='input'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </section>
                        </section>
                        <section className='button'>
                            <button type='submit'>Log in</button>
                            {response && <p className='response-message'>{response}</p>}
                            {error && <p className='error-message'>{error}</p>}
                            <hr />
                            <p>Don't have an account? <Link to='/Register'>Register</Link></p>
                        </section>
                    </form>
                </article>
            </main>
        </>
    );
}

export default Login;
