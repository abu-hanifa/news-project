import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authSigIn } from "../features/applicationSlice"
import styles from './sign.module.css'

const SignIn = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const error = useSelector((state) => state.application.error)
    
    const dispatch = useDispatch()

    const handleSetName = (e) => {
        setLogin(e.target.value)
    }
    const handleSetPass = (e) => {
        setPassword(e.target.value)
    }
    const handleSignIn = (e) => {
        e.preventDefault()
        if(!login.trim()){
            setPassword('')
            return alert('введите логин')
            
        } else if (!password.trim()){
            setLogin('')
            return alert('введите пароль')
        } else {
            dispatch(authSigIn({login, password}))
            setLogin('')
            setPassword('')
        }
    }
    if (error) {
        return <div>{error}</div>
    }


    return (
        <form className={styles.form} onSubmit={handleSignIn}>
            <h2>Войти</h2>
            <div className={styles.sign}>
            <input placeholder="login" type="text" value={login} onChange={handleSetName}/>
            <input placeholder="password" type="password" value={password} onChange={handleSetPass} />
            <button>Add</button>
            </div>
        </form>
    )
}

export default SignIn