import userData from '../mockData/users.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const userService = {
  async getAll() {
    await delay(300)
    return [...userData]
  },

  async getById(id) {
    await delay(200)
    const user = userData.find(u => u.id === id)
    if (!user) throw new Error('User not found')
    return { ...user }
  },

  async create(userData) {
    await delay(400)
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    return { ...newUser }
  },

  async update(id, updates) {
    await delay(300)
    const userIndex = userData.findIndex(u => u.id === id)
    if (userIndex === -1) throw new Error('User not found')
    
    const updatedUser = { ...userData[userIndex], ...updates }
    userData[userIndex] = updatedUser
    return { ...updatedUser }
  },

  async delete(id) {
    await delay(250)
    const userIndex = userData.findIndex(u => u.id === id)
    if (userIndex === -1) throw new Error('User not found')
    
    const deletedUser = userData.splice(userIndex, 1)[0]
    return { ...deletedUser }
  }
}

export default userService