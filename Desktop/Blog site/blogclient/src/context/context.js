import React,{Component} from 'react';
import blogService from '../services/blogService'

/* IMPORTANT */
/* react-router-dom, node-sass, polyglot, updeep, lodash, axios */

const BlogContext = React.createContext()

export default class BlogContextProvider extends Component {
    
    state = {
        userName:'',
        userEmail:'',
        blogs :[],
        myBlogs:[],
        sortedMyBlogs:[],
        sortedBlogs :[] ,
        type : 'All',
        loading : true,
        userAuth: false,
        eddited : false
    };

    
    loggingIn = async(email,psw) =>{
        let res = await blogService.logIn(email,psw)
        console.log(res)
        if(res.status === 'Success')
        {
            this.setState({
                userName: res.name,
                userEmail: res.email,
                userAuth: true
            })
            console.log(res.email)
            this.getMyBlogs(email)
        }
        return res
    }

    logOut = () => {
        this.setState({
            userAuth: false
        })
    }

    signingUp = async(name,email,psw) =>{
        let res = await blogService.signUp(name,email,psw)
        if( res.status === "Success") 
        {
            this.setState({
                userName: res.name,
                userEmail: res.email,
                userAuth: true
            })
        }
        return res
    }

    getBlogs = async() => {
        try {
            let res = await blogService.getAll()            
        this.setState({
            blogs:res,
            sortedBlogs: res,
            loading: false,
        }) 
    }catch(err) {
        console.log(err)
    }
}

    getMyBlogs = async(email) => {
        console.log(email)
        let res = await blogService.getUserBlogs(email)
        console.log(res)
        this.setState({
            myBlogs: res.blogs.userBlogs,
            sortedMyBlogs: res.blogs.userBlogs
        })
        return res
    }

    componentDidMount() {
        this.getBlogs()
    }
    
    // componentDidUpdate(prevState) {
    //     if(this.state.userEmail !== prevState.userEmail){
    //         this.getMyBlogs(this.state.userEmail)
    //     }
    // }

    // componentDidUpdate(prevProps, prevState) {
        // console.log("before if update");
        // console.log(prevState)
        // console.log(this.state.blogs); 
        // if(JSON.stringify(prevState.blogs) !== JSON.stringify(this.state.blogs))
        // if(prevState.blogs.length !== this.state.blogs.length)
        // {
        //     console.log("AFTER Update!!!!!!!!!!!!!!!!!!!!!!");
        //     console.log("without .length not working");          
        // console.log(prevState.blogs)
        // console.log(this.state.blogs);
        //     this.getBlogs()
        // }
    // }

    getBlogDetail = async(id) =>{
        let res = await blogService.getOne(id)
        return res
    }

    postBlogs = async(blogOne) => {
        let postedBlog = await blogService.postOne(blogOne)
        console.log(postedBlog);
        
        this.setState(prevState => ({
            type: 'All',
            sortedBlogs:  [ postedBlog.blog,...prevState.blogs ],
            blogs:  [ postedBlog.blog,...prevState.blogs ],
            myBlogs: [ postedBlog.blog,...prevState.myBlogs ],
            sortedMyBlogs: [ postedBlog.blog,...prevState.myBlogs ]
        }))
    }


    putBlog = async(id,blog) =>{
        let putBlog = await blogService.putOne(id,blog)      

        this.getBlogDetail(id)
        this.getBlogs()
        this.getMyBlogs(this.state.userEmail)

        this.setState({    
            type: 'All',
            eddited: true
        })
    }

    handleChange = event => {
        const target = event.target

        const value = target.type === 'checkbox' ? target.checked : target.value

        const name = event.target.name

        console.log(value);

        console.log(name);
        

        this.setState({
            [name]:value
        },this.filterBlog)
    }    

        
        filterBlog = () => {

            let {
                blogs,type,myBlogs
            } = this.state

            console.log(myBlogs)

            let tempBlogs = [...blogs]
            let tempMyBlogs = [...myBlogs]

            console.log(tempMyBlogs)

            if(type !== 'All'){
                tempBlogs = tempBlogs.filter(blogs => blogs.type === type)
                tempMyBlogs = tempMyBlogs.filter(blogs => blogs.type === type)
            }
    
            this.setState({
                sortedBlogs: tempBlogs,
                sortedMyBlogs: tempMyBlogs
            })
    }

    render()
    {
        return(
            <BlogContext.Provider value={
                {
                    ...this.state,
                handleChange: this.handleChange,
                getBlogDetail: this.getBlogDetail,
                postBlogs: this.postBlogs,
                putBlog: this.putBlog,
                loggingIn: this.loggingIn,
                logOut: this.logOut,
                signingUp: this.signingUp,
                getMyBlogs: this.getMyBlogs
                }
            }
                >
                {this.props.children}
            </BlogContext.Provider>
        )
    }
}

const BlogConsumer = BlogContext.Consumer

export {BlogContext,BlogConsumer}