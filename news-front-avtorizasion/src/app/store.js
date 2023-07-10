import { configureStore } from "@reduxjs/toolkit";
import application from "../features/applicationSlice";
import users from "../features/usersSlice";
import todos from "../features/todosSlice";
import news from "../features/newsSlice";
import categories from "../features/categoriesSlice";

export const store = configureStore({
    reducer: {
        application,
        users,
        todos,
        news,
        categories
    }
})