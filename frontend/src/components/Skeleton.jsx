import { motion } from 'framer-motion';

const Skeleton = ({ className = '', variant = 'default', count = 1 }) => {
  const variants = {
    default: 'h-4 bg-white/10 rounded',
    card: 'h-48 bg-white/10 rounded-xl',
    avatar: 'w-12 h-12 bg-white/10 rounded-full',
    text: 'h-4 bg-white/10 rounded w-3/4',
    title: 'h-6 bg-white/10 rounded w-1/2',
    button: 'h-10 bg-white/10 rounded-lg w-24',
    circle: 'w-16 h-16 bg-white/10 rounded-full',
  };

  const shimmerStyle = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  };

  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`${variants[variant]} ${className}`}
            style={shimmerStyle}
          />
        ))}
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${variants[variant]} ${className}`}
      style={shimmerStyle}
    />
  );
};

export default Skeleton;



