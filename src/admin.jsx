import { useEffect,useState } from "react"
import { supabase } from "./supabaseClient"

export default function Admin(){

const [messages,setMessages] = useState([])

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

return(

<div className="p-10">

<h1 className="text-2xl font-semibold mb-6">
Admin Dashboard
</h1>

{messages.map(msg=>(

<div
key={msg.id}
className="border p-4 mb-4 rounded-lg"
>

<p className="font-medium">
Prompt:
</p>

<p className="mb-2">
{msg.prompt}
</p>

<p className="text-sm text-gray-500">
Status: {msg.status}
</p>

</div>

))}

</div>

)

}