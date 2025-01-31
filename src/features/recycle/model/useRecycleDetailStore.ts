import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface RecycleProps{
    title:string;
    type:string
    imgUrl:string;
    context:string;
    subcontext:string;
    setTitle:(title:string)=>void;
    setType:(type:string)=>void;
    setImgUrl:(imgUrl:string)=>void;
    setContext:(context:string)=>void;
    setSubContext:(subcontext:string)=>void;
}

export const useRecycleStore = create(
    persist<RecycleProps>(
        (set)=>({
        title:"", type:"", imgUrl:"", context:"", subcontext:"",
        setTitle:(title:string)=>set({title}),
        setType:(type:string)=>set({type}),
        setImgUrl:(imgUrl:string)=>set({imgUrl}),
        setContext:(context:string)=>set({context}),
        setSubContext:(subcontext:string)=>set({subcontext})
    }),
    {
        name:'recycle-storage'
    } 
))