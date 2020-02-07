import React,{useContext} from 'react';
import './App.css'
import {Route,Switch} from 'react-router-dom'
import MyBlogs from './components/MyBlogs'
import NewBlog from './components/NewBlog';
import NavBar from './components/NavBar';
import Blogdetail from './components/Blogdetail';
import Error from './components/Error'
import Blogcontainer from './components/Blogcontainer';
import BlogEdit from './components/BlogEdit';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import {BlogContext} from './context/context'


function App() {

  let {userAuth} = useContext(BlogContext)

  // console.log(document.cookie)

  return (
    <>
      <div className='grid-container'>
      { userAuth ?  
      <>
      <NavBar /> 
      <Switch>
      <Route exact path='/blogs/myblogs' component={MyBlogs} />
      <Route exact path='/blogs' component={Blogcontainer} />
      <Route exact path='/newblogs' component={NewBlog} />
      <Route exact path='/blogs/:id' component={Blogdetail} />
      <Route exact path='/blogs/:id' component={BlogEdit} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={Signup} />
      <Route component={Error} />
    </Switch>
      </>
      :
      <Switch>
              <Route exact path='/' component={SignIn} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/signup' component={Signup} />
              <Route component={Error} />
      </Switch>
      } 
      </div>
  
    </>
  );
}

export default App;
