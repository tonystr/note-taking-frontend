import atCampusLogo from 'icons/atcampus_logo_black.png';

function InputField({text }) {
    return (
        <div>
            <label>{text}</label>
            <input type="text" placeholder={text}/>
        </div>
    );
}

function LoginPage() {
    return (
        <div className="h-full w-wull bg-purple-5">
            <div >
                <img src={atCampusLogo.src} width={atCampusLogo.width} alt='' 
                className="border-2 border-blue-300"/>
            </div>
            Hallo log in please

            {/* Login panel */}
            <div className='w-[600px] h-[300px] bg-white rounded-xl shadow-md'>
                <form>
                    <InputField text="Username"/>
                    <InputField text="Password"/>
                </form>
                
                <form className='mt-20'>
                    <input name="email" className=" block w-96 h-10 outline-none border border-gray-300 focus:border-form-border-active focus:bg-transparent shadow-sm rounded placeholder-transparent peer " placeholder="E-post" />
                </form>  
                <form className='flex border-2 border-green-600'>
                  <label className='mx-0'>Username</label>
                  <input id="name" type="text" required className='login rounded-sm' />
                  <label >Password</label>
                  <input id="password" type="text" autoComplete='password' required />
                  <button type="submit">Log in</button>
                </form>
            </div>
            
            

        </div>
    );
}

export default LoginPage;