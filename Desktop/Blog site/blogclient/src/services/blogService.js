import axios from 'axios'

export default {

    signUp: async (name,email,psw) => {
        let res = await axios.post('/signup',{name,email,psw} )
        return res.data || []
    },

    logIn: async (email,psw) => {
        let res = await axios.post('/signin',{email,psw})
        return res.data || []
    },

    getAll: async () => {
        let res = await axios.get('/api/blogs')
        return res.data || []
    },

    getUserBlogs: async (email) => {
        console.log(email)
        let res = await axios.get('/api/blogs/myblogs',{ params: {email} })
        return res.data || []
    },

    getOne: async (id) => {
        let res = await axios.get('/api/blogs/' +id)
        return res.data || []
    },

    postOne: async (blog) => {
        let res = await axios.post('/api/blogs',{blog})
        return res.data || []
    },

    putOne: async(id,blog) => {
        let res = await axios.put('/api/blogs/' +id,{blog})
        return res.data || []
    }

}