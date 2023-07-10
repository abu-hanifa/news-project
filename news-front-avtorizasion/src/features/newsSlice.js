import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    news: []
}

export const fetchNews = createAsyncThunk(
    "news/fetch",
    async (_, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:5000/news")
            const news = await res.json()
    
            if(news.error){
                return thunkAPI.rejectWithValue(news.error)
            }
            return news  
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
        
    }
)

export const fetchNewsCategorie = createAsyncThunk(
    "newsCategorie/fetch",

    async (id, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:5000/news/${id}`)
            const newsCategorie = res.json()
            if(newsCategorie.error) {
                return thunkAPI.rejectWithValue(newsCategorie.error)
            }
            return newsCategorie
            
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
    
)

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.news = action.payload
        })
        .addCase(fetchNewsCategorie.fulfilled, (state, action) => {
            state.news = action.payload
        })
    }
})

export default newsSlice.reducer
