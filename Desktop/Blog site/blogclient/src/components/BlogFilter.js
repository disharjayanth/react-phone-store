import React from 'react'
import {useContext} from 'react'
import {BlogContext} from '../context/context'


//get all unique types from all blogs
// const getUnique = (items,value) =>{
// return [...new Set(items.map(item => item[value]))]
// }

const BlogFilter = ( {blogs} ) => {

    const { handleChange,type } = useContext(BlogContext)

    // console.log(type)
    

    //get unique type
    // let types = getUnique(blogs,'type')

    let types = ['All','Science and technolgy','Politics','Space','Automobile','IT']

    types = types.map((item,index) =>{
        return <option key={index} value={item}> {item} </option>
    })

    return ( 

        <form>
            <select 
        name='type' 
        id='type' 
        value={type} 
        className='type-control'
        onChange={handleChange}
        >
            {types}
        </select>
        </form>

    );
}

export default BlogFilter;