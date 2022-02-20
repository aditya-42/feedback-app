import React from "react"
import { v4 as uuidv4 } from 'uuid';
import {createContext, useState} from "react";


const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) =>{
    const [feedback, setFeedback] = useState([
        {
            id:1,
            text:"text from feedback context 1",
            rating: 10
        },

        {
            id:2,
            text:"text from feedback context 2",
            rating: 8
        },

        {
            id:3,
            text:"text from feedback context 3",
            rating: 7
        }

    ])

    const [feedbackEdit, setFeedbackEdit] = useState(
        {
            item: {},
            edit: false
        })


    const deleteFeedback = (id) => {

        if(window.confirm("Are you sure you want to delete the feedback?"))
        setFeedback(feedback.filter((item)=>{
            return item.id !== id;
        }))
        
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback,...feedback]);
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        });
    }

    const updateFeedback = (id, updItem) =>{
        setFeedback(feedback.map((item)=> item.id === id ? {...item, ...updItem}: item))
        setFeedbackEdit({
            item:{},
            edit:false
          })
    }

    return (<FeedbackContext.Provider value={{
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        feedback,
        feedbackEdit
    }} >
        {children}
    </FeedbackContext.Provider>)

}

export default FeedbackContext;
