import { FC } from 'react'

import { motion } from 'framer-motion'

const FadeInAnimation: FC = ({ children }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 40, opacity: 0 }}
  >
    {children}
  </motion.div>
)
export default FadeInAnimation
