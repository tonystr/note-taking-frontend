import atCampusLogo from 'icons/atCampus-Logo-bg-purple-5.jpg';
import LoginFooter from 'icons/LoginFooter.jpg';

function InputField({id, type, text }) {
    return (
        <div className='relativering-1'>
            
            <p className='relative'>
                <input
                className='
                block w-full h-full p-2 pt-5 mt-4
                outline-none ring-1 ring-gray-300 
                focus:bg-transparent 
                focus:ring-purple-1
                shadow-sm rounded peer'
                type={type} placeholder=' ' id={id} />
                
                <label className='
                absolute select-none
                block transistion-all pointer-events-none 
                py-4 -top-3.5 left-2 text-md text-dark-1  
                transition-all              
                peer-placeholder-shown:text-md
                peer-placeholder-shown:text-gray-500
                peer-placeholder-shown:top-0
                peer-focus:-top-3.5
                peer-focus:text-sm
                peer-focus:text-dark-1
                ' htmlFor={id}
                >{text}</label>
                <div className=" absolute z-1 pointer-events-none -top-0 -right-0 -left-0 -bottom-0 rounded opacity-0 border-b-4 border-form-border-active border-purple-1 peer-focus:opacity-100 "></div>
            </p>
        </div>
    );
}

function LoginPage() {
    return (
        <div className=" w-full bg-[#F8F8FF]">
            <div >
                <a href='/'>
                    <img src={atCampusLogo.src} width={atCampusLogo.width * 0.2} alt='' 
                    className="m-auto py-10 select-none"/>
                </a>
            </div>

            {/* Login panel */}
            <div className='w-[700px] mt-10 py-5 m-auto text-center bg-white rounded-xl shadow-md'>

                <h1 className='font-bold text-[45px] text-dark-1'>Kom i gang!</h1>
                <span className='text-sm'>Av studenter. For studenter. For en gangs skyld.</span>

                <form className='w-9/12 m-auto p-2'>
                    <InputField id="username" type="text" text="Username"/>
                    <InputField id="password" type="password" text="Password"/>

                    <button className='
                    w-full py-3 mt-4 select-none
                    text-white font-bold
                    bg-purple-1 rounded-standard
                    focus:ring-purple-1 
                    focus:ring-offset-1 
                    focus:ring-2 
                    hover:shadow-md 
                    hover:shadow-purple-2/50'>
                        Logg inn
                    </button>
                </form>
            </div>

            <div >
                <img src={LoginFooter.src} width={LoginFooter.width * 1} alt='' 
                className="m-auto mt-36 select-none"/>
            </div>


            
            

        </div>
    );
}

export default LoginPage;