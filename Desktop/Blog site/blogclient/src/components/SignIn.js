import React,{useState,useContext} from 'react';
import logo from './images/login.png'
import { BlogContext } from '../context/context';
import HeadShake from 'react-reveal/HeadShake';
import Fade from 'react-reveal/Fade';

const SignIn = (props) => {

    let {loggingIn} = useContext(BlogContext)

    const [email,setEmail] = useState('test3@test.com')
    const [psw,setPsw] = useState('tester')
    const [inv,setInv] = useState(false)

    const handleSumbit = async(e) =>{
        e.preventDefault()
        // console.log(props);
        let a  = await loggingIn(email,psw)
        // console.log(a);
        if(a.status === 'Success'){
            props.history.push('/blogs')
        }
        else{
            setInv(true)
        }
    }

    const signUp = () =>{
        props.history.push('/signup')
    }

    /*    **new**RegExp  takes a string and returns REGULAR EXPRESSION ..... SO RegExp used below not required*/
    let patt = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    let res = patt.test(email)


    return (
        <>
        <form id='login' onSubmit={handleSumbit} >
            <div className='imagecontainer'>
                <img src={logo} alt='avatar' className='avatar' />
            </div>
        
            <div className='signin-container'>
                <label htmlFor='e-mail'><b>Email</b></label>
                <input 
                type='text' 
                value={email} 
                placeholder='Enter the email'
                onChange={(e) => 
                    {
                        setEmail(e.target.value)
                        setInv(false)
                    }} 
                required />

                {
                    res ?
                    '' :
                    <Fade>
                    <p className='invalidUser'>Email in wrong format!</p>
                    </Fade>
                }

                <label htmlFor="psw"><b>Password</b></label>
                <input 
                type="password" 
                value={psw} 
                placeholder="Enter Password" 
                name="psw" 
                onChange={(e)=> 
                    {
                        setPsw(e.target.value)
                        setInv(false)
                    }}
                required />

                {
                    inv ? 
                    <HeadShake>
                    <p className='invalidUser'>Wrong email or password!</p>
                    </HeadShake>
                    :
                    ''  
                }  

                <button type="submit">SignIn</button>
                {/* <label>
                <input type="checkbox" checked="checked" name="remember" />
                </label> */}

                <p id="Authmessage"></p>
                <button onClick={signUp}>Don't have Account? Sign Up.</button>
            </div>
        </form>
        </>
    )
}

export default SignIn;