import React,{useContext} from 'react'
import BlogList from './BlogList'
import {BlogConsumer, BlogContext} from '../context/context'
import BlogFilter from './BlogFilter'
import Loading from './Loading'
import Fade from 'react-reveal/Fade'


export default function Blogcontainer(props) {

    // console.log(props);

    let {logOut,userName} = useContext(BlogContext)

    let loggingOut = () => {
        logOut()
        props.history.push('/signin')
    }


    return (


        <BlogConsumer>            
            {
                (value) => {
                    const {loading,sortedBlogs,blogs} = value

                    // console.log(sortedBlogs);
                    

                    if(loading) {
                        return <Loading />
                    }
                    
                    return (
                        <div>
                        <button className='signOutButton' onClick={loggingOut} >Sign out!</button>
                        <BlogFilter blogs={blogs} />
                        <h1 className='yourblog' > Hello {userName}, </h1>
                        <Fade>
                        <BlogList blogs={sortedBlogs} />
                        </Fade>
                        </div>
                    )
                }
            }
        </BlogConsumer>
    )
}


// export default Blogcontainer;