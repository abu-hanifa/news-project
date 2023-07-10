import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories: []
}

export const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async (_,thunkAPI) => {
        try {
            const res = await fetch("http://localhost:5000/categories")
            const categories = await res.json()

            if(categories.error){
               return thunkAPI.rejectWithValue(categories.error)
            }
            return categories
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})

export default categoriesSlice.reducer

