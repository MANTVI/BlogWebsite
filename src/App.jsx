import { useEffect, useState } from 'react'
import {useDispatch}  from 'react-redux'
import authService from './AppWrite/Auth'
import { login,logout } from './Store/AuthSlice'
import {Outlet} from 'react-router-dom'
import './App.css'
import {Header,Footer} from './Component/index'


function App() {
  //use loading state if we fetch data from database and we perform conditonal rendering and network state
  const [loading, setLoading] = useState(true) // in useEffect we set false 
  const dispatch =useDispatch()

  useEffect(()=>{
    authService.currentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))

      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))

  },[])

 return !loading ? (
    <div className='min-h-screen  flex flex-wrap content-between bg-gray-400'>
      <div  className='w-full '>
        <Header/>
        <main>
          <Outlet/>

        </main>
        <Footer/>
      </div>

    </div>
  ): null;

}

export default App;
