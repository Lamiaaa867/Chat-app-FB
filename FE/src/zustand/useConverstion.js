import {create} from 'zustand'
const useConversation = create((set) => ({
selectedConversation:null,
setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
messages:[],
setMessages:(messages)=>{
    console.log("messages from set mesaage", messages)
    set({messages})}

}))
export default useConversation  
