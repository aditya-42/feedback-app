import React from "react";
import FeedbackContext from "../context/FeedbackContext";
import { useContext } from 'react'

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  let rating = Math.round(feedback.reduce((acc,curr)=>{
        return acc + curr.rating;
  },0)/feedback.length);

  return (
    <div className="feedback-stats">
       <h4>{feedback.length} Reviews</h4>
       <h4>Average rating: {isNaN(rating) ? '0' : rating}</h4>
    </div>
  )
}


export default FeedbackStats