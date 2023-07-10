import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authSigUp } from "../features/applicationSlice"
import styles from './sign.module.css'

const SignUp = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
   
    

   
    

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSetName = (e) => {
        setLogin(e.target.value)
    }
    const handleSetPass = (e) => {
        setPassword(e.target.value)
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        if(!login.trim()){
            setPassword('')
            return alert('введите логин')
          
        } else if (!password.trim()) {
            setLogin('')
            return alert('введите пароль')
        } else {
            dispatch(authSigUp({login, password}))
            setLogin('')
            setPassword('')
            navigate('/login')
        }
        

            
       
           
        
    }


    return (
        <form className={styles.form} onSubmit={handleSignUp}>
            <h2>Зарегистрироваться</h2>
            <div className={styles.sign}>
            <input placeholder="login" type="text" value={login} onChange={handleSetName}/>
            <input placeholder="password" type="password" value={password} onChange={handleSetPass}/>
            <button>Add</button>
            </div>
        </form>
    )
}

export default SignUp