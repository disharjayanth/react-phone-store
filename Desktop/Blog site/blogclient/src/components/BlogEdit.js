import React, { useState,useContext } from 'react' 
import { BlogContext } from '../context/context'
import Flash from 'react-reveal/Flash';
import HeadShake from 'react-reveal/HeadShake';


const BlogEdit = (props) => {
    
    const {putBlog} = useContext(BlogContext)

    let a = props.data

    const id = a._id
    let typeval = a.type
    let titleval = a.title
    let imgval = a.img
    let infoval = a.info

    let [type,setType] = useState(typeval)
    let [title,setTitle] = useState(titleval)
    let [img,setImg] = useState(imgval)
    let [info,setInfo] = useState(infoval)
    let [eddited,setEddited] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        let blogEdit = {
            type,
            title,
            img,
            info
        }
        putBlog(id,blogEdit)
        setEddited(true)
        
    }

    return (
        <>
        <form className='editForm' onSubmit={handleSubmit} >
        <HeadShake>

        <label htmlFor='category'>Select category: </label>
        <select id='blogtype' value={type} onChange={(e) => setType(e.target.value) }>
            <option value="Science and technolgy">Science and technolgy</option>
            <option value="Politics">Politics</option>
            <option value="Space">Space</option>
            <option value="Automobile">Automobile</option>
            <option value="IT">IT</option>
        </select>    

        <label htmlFor='title'> Title: </label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value) } placeholder='Enter Title'/>
    
        <label htmlFor='image'>Image Link:</label>
        <input type='text' value={img} onChange={(e) => setImg(e.target.value)} placeholder='Enter imgURL' />

        <label htmlFor='description'>Description:</label> 
        <textarea type='text' value={info} onChange={(e) => setInfo(e.target.value)} placeholder='Enter Description' />
        
        
        <input type='submit' value='Edit Blog'/>
        </HeadShake>
        </form>

        {
            eddited ? <Flash><p className='addedBlog' >Blog Edited!</p> </Flash>  : ''
            
        }

        </>
        )
}

export default BlogEdit;