import { useState, useRef, useEffect } from "react"
import { supabase } from "./supabaseClient"

export default function App() {

const [input,setInput] = useState("")
const [messages,setMessages] = useState([])
const [loading,setLoading] = useState(false)

const bottomRef = useRef(null)

useEffect(()=>{
 bottomRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

async function sendMessage(){

 if(!input.trim()) return

 const userMessage={
   role:"user",
   text:input,
   time:new Date().toLocaleTimeString()
 }

 setMessages(prev => [...prev,userMessage])
 setInput("")
 setLoading(true)

 await supabase.from("messages").insert([
   {prompt:input,status:"pending"}
 ])

 setTimeout(()=>{

 const botMessage={
   role:"bot",
   text:"Thank you. Your message has been received. You will receive a response shortly.",
   time:new Date().toLocaleTimeString()
 }

 setMessages(prev=>[...prev,botMessage])
 setLoading(false)

 },1000)

}

return(

<div style={{
height:"100vh",
background:"#f5f7fb",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontFamily:"Inter, sans-serif"
}}>

<div style={{
width:"420px",
height:"650px",
background:"white",
borderRadius:"14px",
boxShadow:"0 10px 40px rgba(0,0,0,0.1)",
display:"flex",
flexDirection:"column"
}}>

<div style={{
padding:"18px",
borderBottom:"1px solid #eee",
fontWeight:"600",
fontSize:"18px"
}}>
Student Support AI
</div>

<div style={{
flex:1,
overflowY:"auto",
padding:"16px"
}}>

{messages.map((msg,index)=>(

<div key={index}
style={{
display:"flex",
justifyContent: msg.role==="user" ? "flex-end":"flex-start",
marginBottom:"10px"
}}
>

<div style={{
background: msg.role==="user" ? "#4f7cff":"#f1f3f6",
color: msg.role==="user" ? "white":"black",
padding:"10px 14px",
borderRadius:"14px",
maxWidth:"70%",
fontSize:"14px"
}}>

<div>{msg.text}</div>

<div style={{
fontSize:"10px",
opacity:0.6,
marginTop:"4px"
}}>
{msg.time}
</div>

</div>

</div>

))}

{loading && (
<div style={{fontSize:"13px",opacity:0.6}}>
Bot is typing...
</div>
)}

<div ref={bottomRef}></div>

</div>

<div style={{
display:"flex",
borderTop:"1px solid #eee",
padding:"10px"
}}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
placeholder="Type your message..."
style={{
flex:1,
border:"none",
outline:"none",
fontSize:"14px"
}}
/>

<button
onClick={sendMessage}
style={{
background:"#4f7cff",
color:"white",
border:"none",
padding:"8px 16px",
borderRadius:"8px",
cursor:"pointer"
}}
>
Send
</button>

</div>

</div>

</div>

)

}