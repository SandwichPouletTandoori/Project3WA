import { NavLink } from "react-router-dom";
import React, { useState } from 'react';

const Contact = () => {
  const [displayText, setDisplayText] = useState('');

  const handleClick = () => {
    setDisplayText('Your comment has been sent!');
  };
    return(
        <>
            <h2>Connect With Us</h2>
            <h3>Our adress</h3>
            <p>The GreenHarvest Enterprises HQ is located at 123 Elm Street, Springfield, Anytown 12345, Fictionland</p>
            <h3>Our email adress</h3>
            <p>You can contact us at greenharvestenterprises@green.com</p>
            <h3>You can also leave a comment bellow and we'll take your comments in consideration.</h3>
            <form method="post">
            <div id="commentSectionDiv">
            <label>Leave us a comment</label>
            <input type="textarea" id="commentSection" name="commentsection" rows="20" cols="20"/>
            <NavLink to='/contact'><button onClick={handleClick}>Submit comment</button></NavLink>
            <div>{displayText}</div> 
            </div>
            </form>
        </>
        )

}

export default Contact