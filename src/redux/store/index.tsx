import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import authReducer from "../slice/auth";
import skillReducer from "../slice/skill";
import experienceReducer from "../slice/experience";
import educationQuery from "../query/education";
import portfolioQuery from "../query/portfolio";
import ChildrenType from "../../types/children";
import React from "react";

const rootReducer = {
    auth: authReducer,
    skill: skillReducer,
    experience:experienceReducer,
    education:educationQuery.reducer,
    portfolio:portfolioQuery.reducer,
  }

const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(educationQuery.middleware , portfolioQuery.middleware)
})


const StoreProvider: React.FC<ChildrenType> = ({children}) => {
    return(
        <Provider store={store}>{children}</Provider>
    )
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default StoreProvider;