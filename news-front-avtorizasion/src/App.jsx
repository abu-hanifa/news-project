import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Routes, Route, Link, Navigate} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Users from './components/Users'
import Todos from './components/Todos'
import News from './components/News'
import Categories from './components/Categories'
import styles from './app.module.css'

function App() {
  const news = useSelector((state) => state.news.news);
  const token = useSelector((state) => state.application.token)
  const dispatch = useDispatch()

function handleExit () {
   localStorage.removeItem('token')
     
}
function fetchnews () {
  dispatch(fetchnews())
}

  if(!token){

    return (
      <div>
        
          
        <div className={styles.menu}>

      <img src="https://i.ibb.co/NNqJ5Cj/1042680.png" />
      
        
        <div>
          
      
          <Link onClick={fetchnews} className={styles.link} to='/News'>News</Link>
          <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
          <Link className={styles.link} to='/login'>Войти</Link>
          </div>
          </div>
        

        <Routes>
        <Route path='/todo/:id' element={<Todos/>}/>
          <Route path='/' element={<Navigate to='/News'/>} />
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/News' element={<News/>}/>
        </Routes>
      </div>
    )
  }
  return (
    <div>
      <div className={styles.menu}>
      <img src="https://i.ibb.co/NNqJ5Cj/1042680.png" />
      <div>
   
    
    <form className={styles.exit} onSubmit={handleExit}>
      <button>выйти</button>
    </form>
    
    <Link onClick={fetchnews} className={styles.men} to='/News'>News</Link>
   
    </div>
    </div>

    <Routes>
      <Route path='/News' element={<News/>}/>
      <Route path='/Categories' element={<Categories/>}/>
      <Route path='/' element={<Navigate to='/News'/>}/>
      <Route path='/todo/:id' element={<Todos/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/login' element={<Navigate to='/' />}/>
      <Route path='/register' element={<Navigate to='/login' />}/>
    </Routes>
    </div>
  )
}

export default App





