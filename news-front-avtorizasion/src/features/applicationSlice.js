import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    error: null,
    signinUp: false,
    signinIn: false,
    token: localStorage.getItem("token")
}

export const authSigUp = createAsyncThunk(
    "auth-sigUp",
    async ({login, password}, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:5000/users",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({login, password})
            })
            const json = await res.json()
            if(json.error){
                return thunkAPI.rejectWithValue(json.error)
            }
            return json
            
            
            
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)

export const authSigIn = createAsyncThunk(
    "auth/signIn",
    async ({login, password}, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({login, password})
            })
            const token = await res.json()
            if(token.error){
                return thunkAPI.rejectWithValue(token.error)
            }
            localStorage.setItem("token", token.token)
            return token
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(authSigUp.fulfilled, (state, action) => {
            state.signinUp = false
        })
        .addCase(authSigIn.fulfilled, (state, action) => {
            state.signinIn = false
            state.token = action.payload.token
        })
    }
})

export default applicationSlice.reducer