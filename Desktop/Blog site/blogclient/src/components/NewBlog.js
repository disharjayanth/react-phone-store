import React,{useState,useContext} from 'react'
import {BlogContext} from '../context/context'
import Flash from 'react-reveal/Flash';
import Fade from 'react-reveal/Fade';



const NewBlog = (props) => {

    const {postBlogs,userEmail}  = useContext(BlogContext)

    const [title,setTitle] = useState('')
    const [info,setInfo] = useState('')
    const [img,setImg] = useState('')
    const [type,setType] = useState('')
    const [added,setAdded] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        const blogOne = {
        type: type,    
        title: title,
        info: info,
        img: img,
        userEmail: userEmail
        }
        postBlogs(blogOne)
        setAdded(true)
        setTitle('')
        setInfo('')
        setImg('')
        // alert('Blog added')
        // props.history.push('/blogs')
    }

    return ( 
    <div>
        <Fade left>
    <form className='blogform' onSubmit={handleSubmit}>
        <div className='blogform-content'>
        <div className='inptype'>
        <div className='col-25'>
        <label for='category'>Select category: </label>
        </div>
        <select required id='blogtype' onChange={(e) => setType(e.target.value)}>
            <option disabled selected value> -- select an option -- </option>
            <option value="Science and technolgy">Science and technolgy</option>
            <option value="Politics">Politics</option>
            <option value="Space">Space</option>
            <option value="Automobile">Automobile</option>
            <option value="IT">IT</option>
        </select>    
        </div>    
        <div className='inptitle'>
        <div className='col-25'>
        <label for='title'> Title: </label>
        </div>
        <div className='col-75'>
        <input type='text' placeholder='Enter Title' value={title} onChange={(e) =>setTitle(e.target.value)} required />
        </div>
        </div>
        <div className='inpinfo'>
        <div className='col-25'>
        <label for='image'>Image Link:</label>
        </div> 
        <div className='col-75'>
        <input type='text' placeholder='Enter imgURL' value={img} onChange={(e) =>setImg(e.target.value)} required />
        </div>
        </div>
        <div className='inpimg'>
        <div className='col-25'>
        <label for='description'>Description:</label> 
        </div>
        <div className='col-75'>
        <textarea type='text' placeholder='Enter Description' value={info} onChange={(e) =>setInfo(e.target.value)} required />
        </div>
        </div>
        </div>
        <div className='submit'>
            <input type='submit' value='Add Blog' />
        </div>
    </form> 
    </Fade>
    {
            added ? <Flash><p className='addedBlog' >Blog Added</p> </Flash>  : ''
            
        }
    </div>
    );
}

export default NewBlog;