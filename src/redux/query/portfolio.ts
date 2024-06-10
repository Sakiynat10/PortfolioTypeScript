import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

import { ENDPOINT, TOKEN } from "../../components/cosnt"



const portfolioQuery = createApi({
    reducerPath:'portfolio',
    baseQuery:fetchBaseQuery({
        baseUrl:ENDPOINT,
        prepareHeaders: (headers) => {
            headers.set('Authorization' , 'Bearer ' + Cookies.get(TOKEN))
            return headers
        }
    }),
    tagTypes:["Portfolio"],
    endpoints:(builder) => ({
        getPortfolios:builder.query({
            query: (page) => ({
                url:`portfolios` ,
                params:page
            }),
            transformResponse: (res) => res,
            providesTags:["Portfolio"]
        }),
        getPortfolio: builder.mutation({
            query: (id) => ({
                url:`portfolios/${id}` ,
                method:'GET' ,
            }),
            transformResponse: (res) => res,
            invalidatesTags:["Portfolio"]
        }),
        createPortfolio: builder.mutation({
            query: (data) => ({
                url: "portfolios" ,
                method: "POST" ,
                body:data
            }),
            invalidatesTags:["Portfolio"]
        }) ,
        updatePortfolio: builder.mutation({
            query: ({id , data}) => (
                {
                    url:`portfolios/${id}` ,
                    method:'PUT' ,
                    body: data
                }
            ),
            invalidatesTags:["Portfolio"]
        }) ,
        deletePortfolio: builder.mutation({
            query:(id) => ({
                url:`portfolios/${id}` ,
                method:'DELETE' ,
            }),
            invalidatesTags:["Portfolio"]
        }) ,
    })
})

export const {
    useGetPortfoliosQuery,
    useGetPortfolioMutation,
    useCreatePortfolioMutation,
    useUpdatePortfolioMutation,
    useDeletePortfolioMutation,
} = portfolioQuery;

export default portfolioQuery;