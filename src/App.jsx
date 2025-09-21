import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import Notfound from './components/Notfound/Notfound';
import ProtectedAuth from './components/protectedAuth/protectedAuth'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes'
import Profile from './components/Profile/Profile';
import PostsDetails from './components/PostsDetails/PostsDetails';

function App() {

const routes = createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {index:true,element: <ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:'profile/:id',element: <ProtectedRoutes><Profile/></ProtectedRoutes>},
    {path:'postsDetails/:id',element: <ProtectedRoutes><PostsDetails/></ProtectedRoutes>},

    {path:'login',element: <ProtectedAuth><Login/></ProtectedAuth>},
    {path:'register',element:<ProtectedAuth><Registration/></ProtectedAuth>},
    {path:'*',element:<Notfound/>},  
  ]}

])

  return (
    <>
     <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
