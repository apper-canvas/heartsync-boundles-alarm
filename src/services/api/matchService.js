import matchData from '../mockData/matches.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// AI Compatibility Algorithm
const calculateCompatibilityScore = (user1, user2) => {
  let totalScore = 0
  let maxScore = 0
  const breakdown = {}

  // 1. Interests Overlap (Weight: 25%)
  const interestsWeight = 0.25
  const user1Interests = user1.interests || []
  const user2Interests = user2.interests || []
  const commonInterests = user1Interests.filter(interest => 
    user2Interests.includes(interest)
  )
  const interestsScore = user1Interests.length > 0 && user2Interests.length > 0 
    ? (commonInterests.length * 2) / (user1Interests.length + user2Interests.length)
    : 0
  breakdown.interests = Math.round(interestsScore * 100)
  totalScore += interestsScore * interestsWeight * 100
  maxScore += interestsWeight * 100

  // 2. Values Alignment (Weight: 30%)
  const valuesWeight = 0.30
  const user1Values = user1.values || []
  const user2Values = user2.values || []
  const commonValues = user1Values.filter(value => 
    user2Values.includes(value)
  )
  const valuesScore = user1Values.length > 0 && user2Values.length > 0
    ? (commonValues.length * 2) / (user1Values.length + user2Values.length)
    : 0
  breakdown.values = Math.round(valuesScore * 100)
  totalScore += valuesScore * valuesWeight * 100
  maxScore += valuesWeight * 100

  // 3. Preferences Matching (Weight: 20%)
  const preferencesWeight = 0.20
  let preferencesScore = 0
  const user1Prefs = user1.preferences || {}
  const user2Prefs = user2.preferences || {}
  
  // Age preference compatibility
  if (user1Prefs.ageRange && user2Prefs.ageRange) {
    const user1InRange = user2.age >= user1Prefs.ageRange.min && user2.age <= user1Prefs.ageRange.max
    const user2InRange = user1.age >= user2Prefs.ageRange.min && user1.age <= user2Prefs.ageRange.max
    if (user1InRange && user2InRange) preferencesScore += 0.4
    else if (user1InRange || user2InRange) preferencesScore += 0.2
  }
  
  // Distance preference
  if (user1Prefs.maxDistance && user2Prefs.maxDistance) {
    const distance = user1.location?.distance || 5
    if (distance <= Math.min(user1Prefs.maxDistance, user2Prefs.maxDistance)) {
      preferencesScore += 0.3
    }
  }
  
  // Relationship type preference
  if (user1Prefs.relationshipType && user2Prefs.relationshipType) {
    if (user1Prefs.relationshipType === user2Prefs.relationshipType) {
      preferencesScore += 0.3
    }
  }
  
  breakdown.preferences = Math.round(preferencesScore * 100)
  totalScore += preferencesScore * preferencesWeight * 100
  maxScore += preferencesWeight * 100

  // 4. Demographic Compatibility (Weight: 15%)
  const demographicWeight = 0.15
  let demographicScore = 0
  
  // Education level compatibility
  if (user1.education && user2.education) {
    const educationLevels = ['High School', 'Some College', 'Bachelor\'s', 'Master\'s', 'PhD']
    const user1Level = educationLevels.indexOf(user1.education)
    const user2Level = educationLevels.indexOf(user2.education)
    const levelDiff = Math.abs(user1Level - user2Level)
    demographicScore += (levelDiff <= 1) ? 0.5 : (levelDiff <= 2) ? 0.3 : 0.1
  }
  
  // Occupation compatibility
  if (user1.occupation && user2.occupation) {
    demographicScore += user1.occupation === user2.occupation ? 0.5 : 0.2
  }
  
  breakdown.demographics = Math.round(demographicScore * 100)
  totalScore += demographicScore * demographicWeight * 100
  maxScore += demographicWeight * 100

  // 5. Lifestyle Compatibility (Weight: 10%)
  const lifestyleWeight = 0.10
  let lifestyleScore = 0
  const user1Lifestyle = user1.lifestyle || {}
  const user2Lifestyle = user2.lifestyle || {}
  
  // Smoking compatibility
  if (user1Lifestyle.smoking !== undefined && user2Lifestyle.smoking !== undefined) {
    lifestyleScore += user1Lifestyle.smoking === user2Lifestyle.smoking ? 0.33 : 0
  }
  
  // Drinking compatibility
  if (user1Lifestyle.drinking && user2Lifestyle.drinking) {
    lifestyleScore += user1Lifestyle.drinking === user2Lifestyle.drinking ? 0.33 : 0.1
  }
  
  // Exercise compatibility
  if (user1Lifestyle.exercise && user2Lifestyle.exercise) {
    lifestyleScore += user1Lifestyle.exercise === user2Lifestyle.exercise ? 0.34 : 0.1
  }
  
  breakdown.lifestyle = Math.round(lifestyleScore * 100)
  totalScore += lifestyleScore * lifestyleWeight * 100
  maxScore += lifestyleWeight * 100

  // Calculate final compatibility percentage
  const compatibilityPercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
  
  // Ensure minimum score of 60% for matches (dating apps typically show promising matches)
  const finalScore = Math.max(60, Math.min(98, compatibilityPercentage + Math.floor(Math.random() * 15)))
  
  return {
    overallScore: finalScore,
    breakdown: {
      interests: Math.max(breakdown.interests, 50),
      values: Math.max(breakdown.values, 55),
      preferences: Math.max(breakdown.preferences, 60),
      demographics: Math.max(breakdown.demographics, 45),
      lifestyle: Math.max(breakdown.lifestyle, 50)
    }
  }
}

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

  async createWithCompatibility(user1, user2) {
    await delay(300)
    const compatibility = calculateCompatibilityScore(user1, user2)
    const newMatch = {
      id: Date.now().toString(),
      user1Id: user1.id,
      user2Id: user2.id,
      timestamp: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      compatibility
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
  },

  // Utility method to calculate compatibility for existing users
  calculateCompatibility: calculateCompatibilityScore
}

export default matchService