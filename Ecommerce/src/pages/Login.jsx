import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful');
            navigate('/');
        }else{
            alert('Invalid email or password');
        }
        
    }




  return (
    <>
        <section className='signup-section'>
                <div className="container my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-4">
                        <h4>Login</h4>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" value={password}  required
                                onChange={(e) => setPassword(e.target.value)} />
                            </div>
                           
                            <button type="submit" className="btn w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            </section>
    </>
  )
}

export default Login