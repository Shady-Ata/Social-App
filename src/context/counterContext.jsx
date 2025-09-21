// data state => provide components
import { createContext, useState } from "react";

export let counterContext = createContext();

export default function CounterContextProvider(props){
    
    let [count,setCounter]= useState(40)

    return <counterContext.Provider value={{count,setCounter}}>
        {props.children}
    </counterContext.Provider>
}