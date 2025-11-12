import { motion } from 'framer-motion';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  illustration 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 glass rounded-xl"
    >
      {Icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-6"
        >
          <Icon className="text-accent" size={48} />
        </motion.div>
      )}
      
      {illustration && (
        <div className="mb-6">
          {illustration}
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-400 mb-6 text-center max-w-md">{description}</p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;



