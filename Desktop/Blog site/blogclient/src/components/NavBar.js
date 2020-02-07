import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { BlogContext } from '../context/context';


const NavBar = () => {

    let {userName} = useContext(BlogContext)


        const myStyle = {
        textDecoration: 'none',
        color: 'black'
    }

    return (  
        <>
        <div className='navbar'>
            <div className='nav-center'>
                <ul className='nav-links'>
                    <li>
                        <Link className='nav-home' style={myStyle} to='/blogs/myblogs'>MyBlogs</Link>
                    </li>
                   
                    <li>
                        <Link className='nav-blogs' style={myStyle} to='/blogs'>Blogs</Link>
                    </li>
                  
                    <li>
                        <Link className='nav-newblog' style={myStyle} to='/newblogs'>Add New Blog</Link>
                    </li>              
                </ul>
            </div>
        </div>
        </>
    );
}

export default NavBar;