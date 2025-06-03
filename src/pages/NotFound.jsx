import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          className="glass-morphism rounded-3xl p-8 shadow-card"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="inline-block mb-6"
          >
            <ApperIcon name="HeartCrack" size={80} className="text-primary mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl font-heading font-bold gradient-text mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-heading font-semibold text-surface-800 mb-4">
            Love Not Found
          </h2>
          
          <p className="text-surface-600 mb-8 leading-relaxed">
            It looks like this page has swiped left and disappeared! Don't worry, there are plenty of other pages in the sea.
          </p>
          
          <Link to="/">
            <motion.button
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-2xl font-medium shadow-glow hover:shadow-xl transition-all duration-200 flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Home" size={20} />
              <span>Back to HeartSync</span>
            </motion.button>
          </motion.
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound