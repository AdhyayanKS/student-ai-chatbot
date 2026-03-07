import { useState } from "react"
import { supabase } from "./supabaseClient"

export default function App(){

const [input,setInput] = useState("")
const [messages,setMessages] = useState([])

async function sendMessage(){

 if(!input.trim()) return

 const userMsg={
   role:"user",
   text:input
 }

 const botMsg={
   role:"bot",
   text:"Thank you. Your message has been received. You will receive a response shortly."
 }

 setMessages([...messages,userMsg,botMsg])

 await supabase.from("messages").insert([
   {
     prompt:input,
     status:"pending"
   }
 ])

 setInput("")
}

return(

<div className="h-screen bg-gray-100 flex flex-col items-center">

<div className="w-full max-w-2xl flex flex-col h-full">

<div className="p-4 text-center font-semibold text-lg border-b bg-white">
Student Support AI
</div>

<div className="flex-1 overflow-y-auto p-4 space-y-3">

{messages.map((msg,index)=>(

<div
key={index}
className={`flex ${msg.role==="user" ? "justify-end":"justify-start"}`}
>

<div
className={`px-4 py-2 rounded-xl max-w-xs text-sm
${msg.role==="user"
? "bg-blue-500 text-white"
: "bg-white border"}
`}
>

{msg.text}

</div>

</div>

))}

</div>

<div className="p-4 border-t bg-white flex gap-2">

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
placeholder="Type your message..."
className="flex-1 border rounded-lg px-3 py-2 outline-none"
/>

<button
onClick={sendMessage}
className="bg-blue-500 text-white px-4 py-2 rounded-lg"
>
Send
</button>

</div>

</div>

</div>

)

}