import { useState } from 'react';
import atCampusLogo from 'icons/atCampus-Logo-bg-purple-5.jpg';
import { useRouter } from 'next/router';
import LoginFooter from 'icons/LoginFooter.jpg';
import { create } from 'utils/api';

function InputField({ onChange, value, id, type, text }) {
    return (
        <div className='relativering-1'>
            
            {/* Input */}
            <div className='relative'>
                <input
                    className='
                        block w-full h-full p-2 pt-5 mt-4
                        outline-none ring-1 ring-gray-300 
                        focus:bg-transparent 
                        focus:ring-purple-1
                        placeholder-transparent select-none
                        shadow-sm rounded peer'
                    type={type}
                    placeholder={text}
                    id={id}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    required
                />
                
                {/* Label */}
                <label className='
                absolute select-none
                block transistion-all pointer-events-none 
                py-4 -top-4 left-2 text-sm text-dark-1  
                transition-all              
                peer-placeholder-shown:text-md
                peer-placeholder-shown:text-gray-500
                peer-placeholder-shown:-top-[3px]
                peer-placeholder-shown:left-4
                peer-focus:-top-4
                peer-focus:left-2
                peer-focus:text-sm
                peer-focus:text-dark-1
                ' htmlFor={id}
                >{text}</label>
                <div className=" absolute z-1 pointer-events-none -top-0 -right-0 -left-0 -bottom-0 rounded opacity-0 border-b-4 border-form-border-active border-purple-1 peer-focus:opacity-100 "></div>
            </div>
        </div>
    );
}

function LoginForm({ setError, toggleRegisterForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <div className='w-9/12 m-auto p-2 '>
            <InputField onChange={setUsername} value={username} id="username" type="text" text="Username"/>
            <InputField onChange={setPassword} value={password} id="password" type="password" text="Password"/>

            <button 
                className='
                    w-full py-3 my-4 select-none
                    text-white font-bold
                    bg-purple-1 rounded-standard
                    focus:ring-purple-1 
                    focus:ring-offset-1 
                    focus:ring-2 
                    hover:shadow-md 
                    hover:shadow-purple-2/50' 

                onClick={() => create('peder-auth/login', { username, password }).then(res => {
                    if (res.success) {
                        router.push({ pathname: '/' });
                    } else if (res.message === 'Not Found') {
                        setError(() => 'Username or password is wrong. Please try again');
                    }
                })}
            >
                Logg inn
            </button>

            <p>
                Har du ikke bruker? <span 
                    className='text-purple-1 hover:underline cursor-pointer'
                    onClick={toggleRegisterForm}
                >
                    Registrer deg her!
                </span>
            </p>
        </div>
    );
}

function RegisterForm({ setError, toggleLoginForm }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter();

    return (
       <div className='w-9/12 m-auto p-2 ' onSubmit={() => false}>
            <InputField onChange={setUsername} value={username} id="username" type="text" text="Create a username"/>
            <InputField onChange={setPassword} value={password} id="password" type="password" text="Choose a secure password"/>
            <InputField onChange={setPassword2} value={password2} id="password2" type="password" text="Type your password again"/>
    
            <button 
                className='
                    w-full py-3 my-4 select-none
                    text-white font-bold
                    bg-purple-1 rounded-standard
                    focus:ring-purple-1 
                    focus:ring-offset-1 
                    focus:ring-2 
                    hover:shadow-md 
                    hover:shadow-purple-2/50'

                onClick={() => {
                    if (password !== password2) {
                        setError(() => 'Passwords do not match');
                        return;
                    }

                    create('peder-auth/user', { username, password }).then(() => {
                        create('peder-auth/login', { username, password }).then(res => {
                            if (res.success) {
                                router.push({ pathname: '/' });
                            }
                        })
                    })
                }}
            >
                Registrer deg
            </button>

            <p>
                Har du allerede bruker? <span 
                    className='text-purple-1 hover:underline cursor-pointer'
                    onClick={toggleLoginForm}
                >
                    Logg inn her!
                </span>
            </p>
       </div>
    );
}



function LoginPage() {
    const [error, setError] = useState(null);
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className=" w-full bg-[#F8F8FF]">
            <div >
                <a href='/'>
                    <img src={atCampusLogo.src} width={atCampusLogo.width * 0.2} alt='' 
                    className="m-auto py-10 select-none"/>
                </a>
            </div>

            {/* Login panel */}
            <div className='xs:w-10/12 md:w-[700px] w-full mt-10 py-5 m-auto text-center bg-white rounded-xl shadow-md'>
                <h1 className='font-bold text-[45px] text-dark-1'>Kom i gang!</h1>
                <span className='text-sm'>Av studenter. For studenter. For en gangs skyld.</span>

                {showLogin ? 
                    <LoginForm toggleRegisterForm={() => setShowLogin(() => false)} setError={setError} /> :
                    <RegisterForm toggleLoginForm={() => setShowLogin(() => true)} setError={setError} />}

                {error ? <p className='text-red-500'>{error}</p> : null}
            </div>

            {/* Footer image */}
            <div >
                <img src={LoginFooter.src} width={LoginFooter.width * 1} alt='' 
                className="m-auto mt-36 select-none"/>
            </div>

        </div>
    );
}

export default LoginPage;