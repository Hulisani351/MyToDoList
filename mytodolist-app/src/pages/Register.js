import './Register.css'

function Register(){
    return(
        <>
            <main className='main'>
                <article>
                    <form>
                        <section className='inputs'>
                            <section className='input'>
                                <label>Name</label>
                                <input type='text' placeholder='Enter your name'></input>
                            </section>
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
                                <button>Register</button>
                                <hr/>
                                <p>Aready have an account <a>log in</a> </p>
                         </section>
                        
                    </form>
                </article>
            </main>
        </>
    )
}
 
export default Register