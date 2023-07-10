import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    loading: false
}

export const fetchTodos = createAsyncThunk(
    "todos/fetch",
    async ({id}, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:5000/todos/${id}`)
            const todos = await res.json()
            if(todos.error) {
                return thunkAPI.rejectWithValue(todos.error)
            }
            return todos
            
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)


export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async({id, text}, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:5000/todos/${id.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${thunkAPI.getState().application.token}`
                },
                body: JSON.stringify({text: text})
            })
            const todo = await res.json()
            return todo
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const removeTodo = createAsyncThunk(
    "todos/removeTodo",
    async (id, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().application.token}`
                }
            })
            if (res.ok){
                return id
            }
            return thunkAPI.rejectWithValue("не удалено")
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload
        })
        .addCase(addTodo.fulfilled, (state, action) => {
            state.todos.unshift(action.payload)
            state.loading = false
        })
        .addCase(addTodo.pending, (state, action) => {
            state.loading = true
        })
        .addCase(removeTodo.fulfilled, (state, action) => {
            console.log(action.payload)
            state.todos = state.todos.filter((todo) => todo !== action.payload)
             state.loading = false
        })
        .addCase(removeTodo.pending, (state, action) => {
            state.loading = true
        })
        
    }
    
})

export default todoSlice.reducer