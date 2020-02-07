import React,{useContext} from 'react'
import BlogList from './BlogList'
import {BlogConsumer, BlogContext} from '../context/context'
import BlogFilter from './BlogFilter'
import Loading from './Loading'
import Fade from 'react-reveal/Fade'

const MyBlogs = (props) => {

    let {sortedMyBlogs,loading,logOut,userName} = useContext(BlogContext)

    console.log(sortedMyBlogs)


    let loggingOut = () => {
        logOut()
        props.history.push('/signin')
    }

    return (    
        <>
            {
            loading 
            ?        
            <Loading /> 
            :
            <>
             
            <div>  
            <button className='signOutButton' onClick={loggingOut} >Sign out!</button>     
            <BlogFilter />
            <h1 className='yourblog' >{userName}'s Blogs, </h1>
            <Fade>
            <BlogList blogs={sortedMyBlogs} />
            </Fade>
            </div>
            
            </>
            }
        </>
    )
}
export default MyBlogs;