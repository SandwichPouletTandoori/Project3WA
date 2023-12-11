import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Comment from "../components/Comment.jsx"

const Contact = () => {
  const [contact, setContact] = useState('');
  const [displayText, setDisplayText] = useState('')
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleCommentSubmit = () => {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment('');
      };
    
    fetch('http://arthurpiau.ide.3wa.io:9001/contact')
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []); 

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    fetch('http://arthurpiau.ide.3wa.io:9001/contact ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: newComment }),
    })
      .then((res) => res.json())
      .then((data) => { 
        setComments([...comments, data]);
        setDisplayText('Your comment has been sent!');
        setNewComment('');
      });
  };
  
  return( 
    <main>
      <h2 className="underline">Connect With Us</h2>
      <h3>Our adress :</h3>
      <p>The GreenHarvest Enterprises HQ is located at 123 Elm Street, Springfield, Anytown 12345, Fictionland</p>
      <h3>Our email adress :</h3>
      <p>You can contact us at greenharvestenterprises@green.com</p>
      <h3>You can also leave a comment bellow and we'll take your comments in consideration :</h3>
      <div id="commentSectionDiv">
        <form>
          <label><span className="italic">Leave us a comment!</span></label>
          <textarea id="commentSection" name="commentsection" rows="20" cols="1" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <button onClick={handleSubmitComment}>Submit comment</button>
        </form>
        <div>{setDisplayText}</div>
      </div>
      <ul className="commentList">
        {comments.map((comment, index) => (
          <Comment key={index} text={comment.text} />
          ))}
      </ul>
    </main>
  );
};

export default Contact;