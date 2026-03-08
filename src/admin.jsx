import { useEffect,useState } from "react"
import { supabase } from "./supabaseClient"

export default function Admin(){

const [messages,setMessages] = useState([])
const [reply,setReply] = useState({})

useEffect(()=>{
 fetchMessages()
},[])

async function fetchMessages(){

 const {data}=await supabase
   .from("messages")
   .select("*")
   .order("created_at",{ascending:false})

 setMessages(data)

}

async function sendReply(id){

 await supabase
   .from("messages")
   .update({
     response:reply[id],
     status:"responded"
   })
   .eq("id",id)

 fetchMessages()

}

return(

<div style={{padding:"40px",maxWidth:"700px"}}>

<h1>Admin Dashboard</h1>

{messages.map(msg => (

<div
key={msg.id}
style={{
border:"1px solid #eee",
padding:"20px",
marginBottom:"20px",
borderRadius:"10px"
}}
>

<p><b>User:</b> {msg.user_id}</p>

<p><b>Prompt:</b> {msg.prompt}</p>

<p><b>Status:</b> {msg.status}</p>

<input
placeholder="Write response..."
value={reply[msg.id] || ""}
onChange={(e)=>setReply({
...reply,
[msg.id]:e.target.value
})}
/>

<button
onClick={()=>sendReply(msg.id)}
>
Send Reply
</button>

</div>

))}

</div>

)

}