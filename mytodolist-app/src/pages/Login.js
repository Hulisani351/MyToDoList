import './Login.css'

function Login(){
    return(
        <>
            <main className='main'>
                <article>
                    <form>
                        <section className='inputs'>
                            <section className='input'>
                                <label>Email</label>
                                <input type='text' placeholder='Enter your Email'></input>
                            </section>
                            <section className='input'>
                                <label>Password</label>
                                <input type='text' placeholder='Enter your password'></input>
                            </section>
                        </section>
                         <section className='button'>
                                <button>Log in</button>
                                <hr/>
                                <p>Don't have an account  <a>Register</a> </p>
                         </section>
                        
                    </form>
                </article>
            </main>
        </>
    )
}
 
export default Login