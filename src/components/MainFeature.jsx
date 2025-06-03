import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import userService from '../services/api/userService'
import matchService from '../services/api/matchService'

const MainFeature = () => {
  const [users, setUsers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [lastMatch, setLastMatch] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        const result = await userService.getAll()
        setUsers(result || [])
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load profiles. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  const currentUser = users[currentIndex]

  const handleSwipe = async (direction) => {
    if (!currentUser) return

    setSwipeDirection(direction)
    
    setTimeout(async () => {
      if (direction === 'right') {
        try {
          // Simulate creating a match
          const match = await matchService.create({
            user1Id: 'current-user',
            user2Id: currentUser.id,
            timestamp: new Date().toISOString(),
            lastActivity: new Date().toISOString()
          })
          
          // Simulate random match (30% chance)
          if (Math.random() > 0.7) {
            setLastMatch({
              user: currentUser,
              matchId: match.id
            })
            setShowMatchModal(true)
            toast.success(`It's a match with ${currentUser.name}! 💕`)
          } else {
            toast.success(`You liked ${currentUser.name}`)
          }
        } catch (err) {
          toast.error('Failed to process like')
        }
      }
      
      setCurrentIndex(prev => prev + 1)
      setSwipeDirection(null)
    }, 300)
  }

  const handleActionButton = (action) => {
    switch (action) {
      case 'pass':
        handleSwipe('left')
        break
      case 'like':
        handleSwipe('right')
        break
      case 'superlike':
        toast.success('Super Like sent! ⭐')
        handleSwipe('right')
        break
      default:
        break
    }
  }

  const closeMatchModal = () => {
    setShowMatchModal(false)
    setLastMatch(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          className="glass-morphism rounded-3xl p-8 text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ApperIcon name="Heart" size={48} className="text-primary mx-auto mb-4 animate-pulse-heart" />
          <p className="text-surface-600">Finding amazing people for you...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="glass-morphism rounded-3xl p-8 text-center max-w-md">
          <ApperIcon name="AlertTriangle" size={48} className="text-secondary mx-auto mb-4" />
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-xl font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!currentUser || currentIndex >= users.length) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          className="glass-morphism rounded-3xl p-8 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ApperIcon name="Users" size={64} className="text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-heading font-semibold mb-2">No More Profiles</h3>
          <p className="text-surface-600 mb-6">
            You've seen everyone in your area! Check back later for new profiles.
          </p>
          <motion.button
            onClick={() => {
              setCurrentIndex(0)
              toast.success('Refreshed profiles!')
            }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl font-medium shadow-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="RefreshCw" size={20} className="inline mr-2" />
            Refresh
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto relative">
      {/* Profile Card Stack */}
      <div className="relative h-[600px] mb-8">
        <AnimatePresence>
          {users.slice(currentIndex, currentIndex + 3).map((user, index) => (
            <motion.div
              key={user.id}
              className={`absolute inset-0 rounded-3xl overflow-hidden shadow-card bg-white ${
                index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
              } ${swipeDirection === 'left' && index === 0 ? 'swipe-left' : ''} ${
                swipeDirection === 'right' && index === 0 ? 'swipe-right' : ''
              }`}
              initial={{
                scale: 1 - index * 0.05,
                y: index * 8,
                opacity: index === 0 ? 1 : 0.8
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 8,
                opacity: index === 0 ? 1 : 0.8
              }}
              exit={{
                x: swipeDirection === 'left' ? -300 : 300,
                rotate: swipeDirection === 'left' ? -30 : 30,
                opacity: 0
              }}
              transition={{ duration: 0.3 }}
              drag={index === 0 ? "x" : false}
              dragConstraints={{ left: -100, right: 100 }}
              onDragEnd={(_, info) => {
                if (index === 0) {
                  if (info.offset.x > 100) {
                    handleSwipe('right')
                  } else if (info.offset.x < -100) {
                    handleSwipe('left')
                  }
                }
              }}
            >
              {/* Profile Image */}
              <div className="relative h-full">
                <img
                  src={user.photos?.[0] || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face'}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Profile Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold mb-1">
                        {user.name}, {user.age}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm opacity-90 mb-3">
                        <ApperIcon name="MapPin" size={16} />
                        <span>{user.location?.distance || '2 km away'}</span>
                      </div>
                      <p className="text-sm opacity-90 line-clamp-2">
                        {user.bio}
                      </p>
                    </div>
                    
                    {/* Verified Badge */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <ApperIcon name="CheckCircle" size={20} className="text-success" />
                    </div>
                  </div>
                  
                  {/* Interests */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {user.interests?.slice(0, 3).map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Swipe Indicators */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 0.5 }}
                >
                  <div className="w-24 h-24 rounded-full bg-success/20 backdrop-blur-sm flex items-center justify-center">
                    <ApperIcon name="Heart" size={40} className="text-success" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex items-center justify-center space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          onClick={() => handleActionButton('pass')}
          className="w-14 h-14 bg-gradient-to-br from-surface-100 to-surface-200 hover:from-surface-200 hover:to-surface-300 rounded-full flex items-center justify-center shadow-card border-2 border-surface-300/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon name="X" size={24} className="text-surface-600" />
        </motion.button>

        <motion.button
          onClick={() => handleActionButton('superlike')}
          className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-full flex items-center justify-center shadow-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon name="Star" size={20} className="text-white" />
        </motion.button>

        <motion.button
          onClick={() => handleActionButton('like')}
          className="w-16 h-16 bg-gradient-to-br from-success to-green-600 hover:from-green-500 hover:to-green-700 rounded-full flex items-center justify-center shadow-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ApperIcon name="Heart" size={28} className="text-white" />
        </motion.button>
      </motion.div>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatchModal && lastMatch && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMatchModal}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-card"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 1 }}
                className="mb-6"
              >
                <h2 className="text-3xl font-heading font-bold gradient-text mb-2">
                  It's a Match! 💕
                </h2>
              </motion.div>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ApperIcon name="Heart" size={32} className="text-primary animate-pulse-heart" />
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary">
                  <img
                    src={lastMatch.user.photos?.[0] || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'}
                    alt={lastMatch.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <p className="text-surface-600 mb-8">
                You and {lastMatch.user.name} have liked each other!
              </p>
              
              <div className="flex space-x-3">
                <motion.button
                  onClick={closeMatchModal}
                  className="flex-1 bg-surface-100 hover:bg-surface-200 text-surface-700 py-3 rounded-2xl font-medium transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Keep Swiping
                </motion.button>
                <motion.button
                  onClick={() => {
                    toast.success('Message feature coming soon!')
                    closeMatchModal()
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-2xl font-medium shadow-glow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature