import React from "react";
import { useContext } from 'react'
import {useState, useEffect} from "react";
import Card from "./shared/Card";
import FeedbackContext from "../context/FeedbackContext";
import Button from "./shared/Button";
import RatingsSelect from "./RatingsSelect"


 
export default function FeedbackForm() {

  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [rating, setRating] = useState(10)
  const [message, setMessage] = useState('');

  
  const {feedbackEdit,addFeedback,updateFeedback} = useContext(FeedbackContext);

  useEffect(()=>{
    if(feedbackEdit.edit === true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  },[feedbackEdit])
  


  const handleTextChange = ({ target : {value}}) =>{

    if(value === ''){
      setBtnDisabled(true);
      setMessage(null);
    }
    else if(value.trim().length<10){
      setMessage("Feedback should be atleast 10 characters or more");
      setBtnDisabled(true);
    }
    else{
      setMessage(null);
      setBtnDisabled(false);  
    }
    setText(value);
  }


  const handleSubmit = (e) =>{
    e.preventDefault();
    if(text.trim().length > 10){
      const newFeedback = {
        text,
        rating,
      }

      if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id, newFeedback);
      }
      else{addFeedback(newFeedback);}
      setText('');
      setBtnDisabled(true);
    }

  }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service?</h2>
            <RatingsSelect select = {(rating)=>setRating(rating)}/>
            <div className="input-group">
                <input type="text" onChange={handleTextChange} placeholder="Write a review" value={text}/>
                <Button type="submit" isDisabled={btnDisabled} >Submit</Button>
            </div>
        </form>
        {message && <div className="message">{message}</div>}
    </Card>
  )
}