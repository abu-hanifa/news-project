import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../features/usersSlice"

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.users)
   
    

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <div>
            {users.map((item) => {
                return <div key={item._id}>{item.login}</div>
            })}
        </div>
    )
}
export default Users