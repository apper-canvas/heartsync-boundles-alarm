import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [currentView, setCurrentView] = useState('discover')

  const navigationItems = [
    { id: 'discover', icon: 'Heart', label: 'Discover' },
    { id: 'matches', icon: 'MessageCircle', label: 'Matches' },
    { id: 'profile', icon: 'User', label: 'Profile' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Floating heart decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-primary-300 opacity-50"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        >
          <ApperIcon name="Heart" size={24} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-16 text-secondary-300 opacity-40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <ApperIcon name="Heart" size={18} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-accent opacity-30"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        >
          <ApperIcon name="Heart" size={20} />
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-4 sm:p-6 lg:p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow">
              <ApperIcon name="Heart" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold gradient-text">
                HeartSync
              </h1>
              <p className="text-sm text-surface-600 hidden sm:block">Find Your Perfect Match</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 rounded-xl glass-morphism hover:bg-white/90 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Bell" size={20} className="text-surface-600" />
            </motion.button>
            <motion.button
              className="p-2 rounded-xl glass-morphism hover:bg-white/90 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Settings" size={20} className="text-surface-600" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentView === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <MainFeature />
              </motion.div>
            )}
            {currentView === 'matches' && (
              <motion.div
                key="matches"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20"
              >
                <div className="glass-morphism rounded-3xl p-8 max-w-md mx-auto">
                  <ApperIcon name="MessageCircle" size={64} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-semibold mb-2">Your Matches</h3>
                  <p className="text-surface-600">Start swiping to find your matches!</p>
                </div>
              </motion.div>
            )}
            {currentView === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20"
              >
                <div className="glass-morphism rounded-3xl p-8 max-w-md mx-auto">
                  <ApperIcon name="User" size={64} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-semibold mb-2">Your Profile</h3>
                  <p className="text-surface-600">Customize your dating profile</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-20 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-sm mx-auto glass-morphism rounded-3xl p-2 shadow-card">
          <div className="flex items-center justify-around">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-glow'
                    : 'text-surface-600 hover:text-primary hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name={item.icon} size={24} />
                <span className="text-xs font-medium mt-1 hidden sm:block">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
    </div>
  )
}

export default Home