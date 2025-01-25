import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {registerUser} from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
const Register = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error} = useSelector((state)=> state.auth)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const onChange = (e) => {
        setFormData((prev)=> ({...prev, [e.target.name]:e.target.value}))
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        const result = await dispatch(registerUser(formData));
        if (result.meta.requestStatus === 'fulfilled'){
            navigate('/login');
        }
    } 

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form className='bg-white p-8 rounded shadow-md max-w-md w-full'  onSubmit={onSubmit}>
                <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
                {/* email, password, name */}
                {error && <div className='text-red-500 mb-2'>{error}</div>}
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1'>Name</label>
                    <input type='text' name='name' required className='w-full border border-gray-300 rounded px-3 py-2' value={formData.name} onChange={onChange}></input>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type='email' name='email' required className='w-full border border-gray-300 rounded px-3 py-2' value={formData.email} onChange={onChange}></input>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-1'>Password</label>
                    <input type='password' name='password' required className='w-full border border-gray-300 rounded px-3 py-2' value={formData.password} onChange={onChange}></input>
                </div>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700'>{loading ? 'Registering': 'Register'}</button>

                <p className='mt-4 text-center'>Already have an account? {' '}
                    <a className='text-blue-600 hover:underline' href='/login'>Login</a>
                </p>
            </form>
        </div>
    )
}


export default Register;