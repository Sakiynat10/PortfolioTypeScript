import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

import { ENDPOINT, TOKEN } from "../../components/cosnt"


const educationQuery = createApi({
    reducerPath:'education',
    baseQuery:fetchBaseQuery({
        baseUrl:ENDPOINT,
        prepareHeaders: (headers) => {
            headers.set('Authorization' , 'Bearer ' + Cookies.get(TOKEN))
            return headers
        }
    }),
    tagTypes:["Education"],
    endpoints:(builder) => ({
        getEducations:builder.query({
            query: (page) => ({
                url:`education` ,
                params:{page}
            }),
            transformResponse: (res) => res,
            providesTags:["Education"]
        }),
        getEducation: builder.mutation({
            query: (id) => ({
                url:`education/${id}` ,
                method:'GET' ,
            }),
            transformResponse: (res) => res,
            invalidatesTags:["Education"]
        }),
        createEducation: builder.mutation({
            query: (data) => ({
                url: "education" ,
                method: "POST" ,
                body:data
            }),
            invalidatesTags:["Education"]
        }) ,
        updateEducation: builder.mutation({
            query: ({id , data}) => (
                {
                    url:`education/${id}` ,
                    method:'PUT' ,
                    body: data
                }
            ),
            invalidatesTags:["Education"]
        }) ,
        deleteEducation: builder.mutation({
            query:(id) => ({
                url:`education/${id}` ,
                method:'DELETE' ,
            }),
            invalidatesTags:["Education"]
        }) ,
    })
})

export const {
    useGetEducationsQuery,
    useGetEducationMutation,
    useCreateEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation,
} = educationQuery;

export default educationQuery;