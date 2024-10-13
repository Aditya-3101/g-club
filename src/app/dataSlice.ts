import {createSlice,PayloadAction} from '@reduxjs/toolkit';

export interface DataEntry {
    _id: string;
    name: string;
    price: number | null;
    orgPrice: number | null;
    imgUrl: string;
    description: string;
    genre: string[];
    thumbMobile?: string;
    thumbPc?: string;
    downloads?: number | null;
    minimum:{
        os:string,
        Ram:number,
        Storage:number,
        Graphics_card:string,
        Video_memory:string,
        Processor:string
    },
    recommended:{
        os:string,
        Ram:number,
        Storage:number,
        Graphics_card:string,
        Video_memory:string,
        Processor:string
    }
  }

export  interface DataState {
    data: DataEntry[];
  }


const initialState:DataState = {
    data:[]
}


export const dataSlice = createSlice({
    name:'add',
    initialState,
    reducers:{
        addData:(state,action:PayloadAction<DataEntry>)=>{
            const existingEntry = state.data.find(item => item._id === action.payload._id);
            if (!existingEntry) {
              state.data.push(action.payload)
            }
        },
        removeData:(state,action:PayloadAction<string>)=>{
            const entry = state.data.filter((par)=>par._id!==action.payload)
            state.data = entry
        }
    }
})

export const {addData,removeData} = dataSlice.actions;

export default dataSlice.reducer;