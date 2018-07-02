import { ADD_REMINDER } from "../constants";
import {bake_cookie,read_cookie } from 'sfcookies';
const reminder = (action)=>{
    const {text} = action;
    return {
        text,
        id:parseInt(Math.random()*10)
    }
}
const reminders = (state =read_cookie('reminder') || [] ,action={})=>{
    let reminders = null;
    switch(action.type){
        case ADD_REMINDER:
            reminders = [ 
                ...state,reminder(action)
            ]   
            bake_cookie('reminder',reminders)
        return reminders
        default : return state;
    }
}

export default reminders