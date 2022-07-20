import React from 'react'
import { useState, useEffect } from 'react'
import { Button, FormControl, Input, InputLabel, IconButton } from '@mui/material';
import './App.css'
import Message from './Message';
import { collection, addDoc, doc, onSnapshot, serverTimestamp, deleteDoc, setDoc, query, where, getDocs, orderBy, updateDoc } from 'firebase/firestore';
import db from './firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';



function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  // useState  = variable in React
  // useEffect = run code on a contion in react
  useEffect(() => {
    // run once when the app component loads
    const collectionRef = collection(db, "messages")
    const queryOrder = orderBy("timestamp", "desc")
    const q = query(collectionRef, queryOrder)
    const unsub = onSnapshot(q, (snapshot) => {

      const result = snapshot.docs.map((doc) => ({ message: doc.data(), id: doc.id }))
      console.log(result);
      setMessages(result)
    }

    )
    return unsub
  }, [])

  useEffect(() => {
    const userName = prompt('please enter your name')
    //if its blank inside, this code run ONce when the app coponent loads
    setUsername(userName)
  }, []);
  console.log(input);
  console.log(messages);

  const sendMessage = async (e) => {
    e.preventDefault()
    try {

      // setDoc(docRef,payload) --> set
      // addDoc(collectionRef,playload)
      const collectionRef = collection(db, "messages")
      const playload = { message: input, username: username, timestamp: serverTimestamp() }
      const docRef = await addDoc(collectionRef, playload)

      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document:  ", e);
    }

    // setMessages([...messages, { username: username, message: input }])
    setInput('')
  }
  return (
    <div className="App">
      <h1> 😾💘🐶    </h1>
      <h1>Hi em iu ! {username}    </h1>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <InputLabel >Enter a message...</InputLabel>
          <Input className='app__input' value={input} onChange={e => setInput(e.target.value)} />
          <IconButton  className='app__iconButton' disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon></SendIcon>
          </IconButton>

          {/* <Button >Send Message</Button> */}
        </FormControl>


      </form>

      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }


      </FlipMove>


    </div>
  )
}

export default App