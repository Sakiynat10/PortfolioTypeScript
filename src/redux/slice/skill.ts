import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import request from "../../server/request"
import { LIMIT } from "../../components/cosnt";
import SkillType from "../../types/skill";
import { RootState } from "../store";

interface InitialStateType {
    loading:boolean , 
    skills:null  | SkillType[],
    total:number,
    selected:null | string,
    btnLoading:boolean,
    isOpen:boolean,
    page:number,
    callback:boolean,
    search:string,
}


const initialState:InitialStateType = {
    loading:false , 
    skills:null,
    total:0,
    page:1,
    selected:null,
    btnLoading:false,
    isOpen:false,
    callback:false,
    search: "",
}

export const getSkills = createAsyncThunk('skill' , async (  params:object  | null, {getState}) => {
    const {page} = (getState() as RootState).skill;
    const {search} = (getState() as RootState).skill
    params = { ...params,page ,search ,  limit: LIMIT}
    const {data} = await request('skills' , {params})
    return data
})




const skillSlice = createSlice({
    initialState,
    name: 'skill' ,
    reducers: {
        controlModal(state) {
            state.isOpen = !state.isOpen
        },
        changePage(state , {payload}){
            state.page = payload
        },
        controlBtnLoading(state) {
            state.btnLoading = !state.btnLoading
        },
        refetch(state){
            state.callback = !state.callback
        },
        setSelected(state , {payload}) {
            state.selected = payload
        },
        handleSearchSkill(state , {payload}){
            state.search = payload
        }
    } ,
    extraReducers:(builder) => {
        builder
           .addCase(getSkills.pending , (state) => {
            state.loading = true
           })
           .addCase(getSkills.fulfilled , (state , {payload : {data , pagination : {total}}}) => {
            state.loading = false;
            state.skills = data;
            state.total = total
           })
           .addCase(getSkills.rejected , (state) => {
            state.loading = false
           })
    }
})



const {reducer: skillReducer , actions} = skillSlice

export const {controlModal ,controlBtnLoading ,refetch , changePage ,setSelected  , handleSearchSkill } = actions


export default skillReducer;
