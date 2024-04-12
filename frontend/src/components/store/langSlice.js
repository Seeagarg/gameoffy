import { createSlice } from '@reduxjs/toolkit';

const initialState={lang:1}

const langSlice = createSlice({
    name:'langSlice',
    initialState:initialState,
    reducers:{
        changeLang:(state,action)=>{
            console.log(action.payload)
            state.lang = action.payload;
            return state;
        }
    }
})

export const {changeLang} = langSlice.actions;
export default langSlice.reducer