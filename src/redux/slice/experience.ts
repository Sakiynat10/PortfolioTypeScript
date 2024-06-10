import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import request from "../../server/request"
import { LIMIT } from "../../components/cosnt";
import { RootState } from "../store";

const initialState = {
    loading:false , 
    experiences: null ,
    skills:null,
    total:0,
    page:1,
    selected:null,
    btnLoading:false,
    isOpen:false,
    callback:false,
    search: "",
}


export const getExperiences = createAsyncThunk('experience' , async( params:object | null , {getState} ) => {
    console.log(getState);
    const {page} = (getState() as RootState).experience
    const {search} = (getState() as RootState).experience
    params = {...params ,page ,search ,  limit: LIMIT}
    const {data} = await request('experiences' , {params})
    return data
})

const experienceSlice = createSlice({
    initialState , 
    name: 'experience' ,
    reducers:{
        controlModal(state){
            state.isOpen = !state.isOpen;
        },
        changePage(state ,{payload}){
            state.page = payload
        },
        controlBtnLoading(state){
            state.btnLoading = !state.btnLoading
        },
        refetch(state){
            state.callback = !state.callback
        },
        setSelected(state , {payload}){
            state.selected = payload
        },
        handleSearchExperience(state , {payload}){
            state.search = payload
        }
    },
    extraReducers:(builder) => {
        builder
           .addCase(getExperiences.pending , (state) => {
            state.loading = true
           })
           .addCase(getExperiences.fulfilled , (state , {payload : {data , pagination : {total}}}) => {
            state.loading = false;
            state.experiences = data;
            state.total = total
           })
           .addCase(getExperiences.rejected , (state) => {
            state.loading = false
           })
    }
})

const {reducer:experienceReducer , actions} = experienceSlice;

export const {controlModal ,controlBtnLoading ,refetch , changePage ,setSelected, handleSearchExperience } = actions

export default experienceReducer