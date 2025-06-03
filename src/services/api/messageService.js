import messageData from '../mockData/messages.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const messageService = {
  async getAll() {
    await delay(200)
    return [...messageData]
  },

  async getById(id) {
    await delay(150)
    const message = messageData.find(m => m.id === id)
    if (!message) throw new Error('Message not found')
    return { ...message }
  },

  async getByMatchId(matchId) {
    await delay(300)
    const messages = messageData.filter(m => m.matchId === matchId)
    return [...messages]
  },

  async create(messageData) {
    await delay(250)
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      timestamp: new Date().toISOString(),
      read: false
    }
    return { ...newMessage }
  },

  async update(id, updates) {
    await delay(200)
    const messageIndex = messageData.findIndex(m => m.id === id)
    if (messageIndex === -1) throw new Error('Message not found')
    
    const updatedMessage = { ...messageData[messageIndex], ...updates }
    messageData[messageIndex] = updatedMessage
    return { ...updatedMessage }
  },

  async delete(id) {
    await delay(150)
    const messageIndex = messageData.findIndex(m => m.id === id)
    if (messageIndex === -1) throw new Error('Message not found')
    
    const deletedMessage = messageData.splice(messageIndex, 1)[0]
    return { ...deletedMessage }
  }
}

export default messageService