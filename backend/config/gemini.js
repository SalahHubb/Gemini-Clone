import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function chat(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export default chat;

/*

AddMessage
   // {userId, conversationId, role, content}
   // just add to the message collection
getMessages

AddConversation
   // {userId, title}
   // create a new conversation
   // return the id
getConversations


POST api/chat/messages/add - userId, conversationId 
GET api/chat/messages      - userId, conversationId
POST api/chat/generate     - prompt

POST api/chat/conversations/add - userId , title - return [conversationId]
GET api/chat/conversations - userId - return [{all conversation of the user}]

 conversations = [
     {
        userId
        title
        timestamp
     }
 ] 


chats = [
 {
    userId
    messages: [
        {conversationId: 1, role: 'user', content: 'what is ..', timestamp: ''}
        {conversationId: 1, role: 'model', content: 'it is ..', timestamp: ''}
        {conversationId: 1, role: 'user', content: 'it is ..', timestamp: ''}
        {conversationId: 1, role: 'model', content: 'it is ..', timestamp: ''}

        {conversationId: 2, role: 'user', content: 'it is ..', timestamp: ''}
        {conversationId: 2, role: 'model', content: 'it is ..', timestamp: ''}
        {conversationId: 2, role: 'user', content: 'it is ..', timestamp: ''}
        {conversationId: 2, role: 'model', content: 'it is ..', timestamp: ''}
    ]
 }
]

sideBar() 
  // always get all conversations of a user from a backend by sending token/session


chatView()
  // const [prompt, setPrompt] 
  // const [currentConversationId, setCurrentConversationId]
  // const [showAnswer, setShowAnswer]
  // const [messages, setMessages]
  // const [loading, setLoading]

  useEffect(() => {
    if conversationId
        fetchMessages()
    }, [currentConversationId]) 
  
  // submitPrompt
      // if currentConversationId is null createNew conversation
      // take the id and set to conversationId 

      // add message here
      // addMessage to db - {role: user, content: prompt, conversationId}
      // load true
      // send to generative ai and take the response
      // load false
      // make empty the prompt
      // add message here

      // return 
          // messages.map(..)
*/
