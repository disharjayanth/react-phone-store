import React,{useState,useContext} from 'react';
import { BlogContext } from '../context/context';
import logo from './images/login.png'
import HeadShake from 'react-reveal/HeadShake';
import Fade from 'react-reveal/Fade'


const SignIn = (props) => {

    let {signingUp} = useContext(BlogContext)

    const [name,setName] = useState('test3')
    const [email,setEmail] = useState('test3@test.com')
    const [psw,setPsw] = useState('tester')
    const [inv, setInv] = useState(false)

    const handleSumbit = async(e) =>{
        e.preventDefault()
        let a  = await signingUp(name,email,psw)
        console.log(a);
        if(a.status === 'Success'){
            props.history.push('/blogs')
        }
        else{
            setInv(true)
            console.log('inside else if')    
        }
    }

    const logIn = () => {
        props.history.push('/signin')
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
            <label for='name'><b>Name</b></label>
                <input 
                type='text' 
                value={name} 
                placeholder='Enter the name'
                onChange={(e) => setName(e.target.value)} 
                required />

                <label for='email'><b>Email</b></label>
                <input 
                type='text' 
                value={email} 
                placeholder='Enter the email'
                onChange={(e) => 
                    {
                        setEmail(e.target.value)
                        setInv(false)
                    }
                } 
                required />

                {
                    res ? 
                    '' :
                    <Fade>
                        <p className='invalidUser' >Invalid email</p>
                    </Fade>
                }

                {    
                    inv ?
                    <HeadShake>
                        <p className='invalidUser' >Email already Registered!</p>
                    </HeadShake>
                    : 
                    ''
                }

                <label for="psw"><b>Password</b></label>
                <input 
                type="password" 
                value={psw} 
                placeholder="Enter Password" 
                name="psw" 
                onChange={(e)=> setPsw(e.target.value)}
                required />

                <button type="submit">SignUp!</button>

                <button onClick={logIn}>Have Account? SignIn.</button>
            </div>
        </form>
        </>
    )
}

export default SignIn;