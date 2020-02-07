import React,{useContext,useEffect,useState} from 'react';
import {BlogContext} from '../context/context'
import BlogEdit from './BlogEdit';
import Loading from './Loading'


const Blogdetail = (props) => {

    const {getBlogDetail,eddited} = useContext(BlogContext)

    let [edit,setEdit] = useState(false)
    let [data,setData] = useState('')

    const id = props.match.params.id


    useEffect(() => {
        async function fetchData(id){
            let res = await getBlogDetail(id)
            setData(res)
        }
        fetchData(id)
    },[setData,id])


    let datetime = new Date(data.createdAt)
        let date = datetime.getDate()+'-'+(datetime.getMonth()+1)+'-'+datetime.getFullYear();
        let time = datetime.getHours() + ":" + datetime.getMinutes()

    let upDt = new Date(data.updatedAt)
        let update = upDt.getDate()+'-'+(upDt.getMonth()+1)+'-'+upDt.getFullYear();
        let uptime = upDt.getHours() + ":" + upDt.getMinutes()

    let handleClick = () => {
        setEdit(!edit)
    }

    return (
        <>
    {
            data === '' ?
            <Loading />
            :
            <div className='blogdetail-outside'>
                <div className='blogdetail-inside'>
                <button className='edit-btn' onClick={handleClick} >
                    {
                    (edit) ? ('Close') : ('Edit')
                    }
                </button>
                    {
                    (edit) 
                    ?
                    (
                    <BlogEdit data={data} />
                    )
                    :
                    (
                        <>
                        <h1 className='title'>{data.title}</h1>
                        <p className='datetime'>Posted on: {date},{time} </p>
                        <p className='datetime'>Last Edited on: {update},{uptime} </p>
                        <p className='type'>{data.type}</p>
                        <img className='img' src={data.img} alt=''></img>
                        <p className='info'>
                        {data.info}
                        </p>
                        </>
                    )
                    
                }
                </div>
            </div>
    }
        </>
    )
}

export default Blogdetail;