import React, { useContext } from 'react';
import {Link } from 'react-router-dom'
import { BlogContext } from '../context/context';


const BlogList = ({blogs}) => {

    let {type} = useContext(BlogContext)

    const renderBlog = blog => {

        let datetime = new Date(blog.createdAt)
        let date = datetime.getDate()+'-'+(datetime.getMonth()+1)+'-'+datetime.getFullYear();
        let time = datetime.getHours() + ":" + datetime.getMinutes()
        return(
            <>
        <Link to={`/blogs/${blog._id}`} style={{ textDecoration: 'none' }}>
            <li key={blog._id} className='list_item_blog'>
            <p className='blog_time'> { date},{ time} </p>
            <h3 className='blog_title'> {blog.title} </h3>
            <img className='blog_img' src={blog.img} alt=''></img>
            <p className='blog_description'> {blog.info} </p>
            </li>
        </Link>
        </>
        )
    }


    return (
        <>
        
        <div className='bloglist'>
        <h1 className='type-title'>{type}:</h1>    
    <ul className='bloglist-list'>
        {(blogs && blogs.length >0) ? (            
        blogs.map(blog => renderBlog(blog))
        ) :(
            <>
            <p>No Blogs Found!</p>
            </>
        )}
    </ul>
    </div>
        </>
    );
}

export default BlogList;