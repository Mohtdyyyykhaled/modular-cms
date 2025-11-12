import { motion } from 'framer-motion';

const TurnCard = ({ front, back, className = '' }) => {
  return (
    <div className={`card-container ${className}`}>
      <motion.div
        className="card-inner"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="card-front glass p-6 flex flex-col items-center justify-center">
          {front}
        </div>
        <div className="card-back glass p-6 flex flex-col items-center justify-center">
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export default TurnCard;

