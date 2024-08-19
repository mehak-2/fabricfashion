import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import borderImage from '../../../dist/assets/border_img.jpg';

function Login() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/'); // Navigate to ProfileForm page after login
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Login failed", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className='bg-black px-10 py-10 rounded-xl'>
                <div className="">
                    <h1 className='text-center text-white text-2xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='bg-white mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-400 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-white mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-400 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        style={{
                            backgroundImage: `url(${borderImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            borderRadius: '20px',
                            padding: '5px'
                        }}
                        onClick={login}
                        className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account? <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Login;
