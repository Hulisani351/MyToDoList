import './Register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useHistory

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/register', { name, email, password });
            setResponse(res.data.message);
            setError('');
            console.log(res);
    
       
            localStorage.setItem('user', JSON.stringify({ name, email }));
    
 
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setResponse('');
            console.log(error);
        }
    };

    return (
        <main className='main'>
            <article>
                <form onSubmit={onSubmit}>
                    <section className='inputs'>
                        <section className='input'>
                            <label>Name</label>
                            <input
                                type='text'
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </section>
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
                        <button type='submit'>Register</button>
                        {response && <p className='response-message'>{response}</p>}
                        {error && <p className='error-message'>{error}</p>}
                        <hr />
                        <p>Already have an account? <Link to='/Login'>Log in</Link></p>
                    </section>
                </form>
            </article>
        </main>
    );
}

export default Register;
