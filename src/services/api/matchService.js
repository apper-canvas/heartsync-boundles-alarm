import matchData from '../mockData/matches.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const matchService = {
  async getAll() {
    await delay(250)
    return [...matchData]
  },

  async getById(id) {
    await delay(200)
    const match = matchData.find(m => m.id === id)
    if (!match) throw new Error('Match not found')
    return { ...match }
  },

  async create(matchData) {
    await delay(300)
    const newMatch = {
      id: Date.now().toString(),
      ...matchData,
      timestamp: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }
    return { ...newMatch }
  },

  async update(id, updates) {
    await delay(250)
    const matchIndex = matchData.findIndex(m => m.id === id)
    if (matchIndex === -1) throw new Error('Match not found')
    
    const updatedMatch = { ...matchData[matchIndex], ...updates }
    matchData[matchIndex] = updatedMatch
    return { ...updatedMatch }
  },

  async delete(id) {
    await delay(200)
    const matchIndex = matchData.findIndex(m => m.id === id)
    if (matchIndex === -1) throw new Error('Match not found')
    
    const deletedMatch = matchData.splice(matchIndex, 1)[0]
    return { ...deletedMatch }
  }
}

export default matchService