import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const STRIPE_COUNT = 5;

export default function StripeTransition() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  // Reduced motion: no decorative wipe, route changes are instant.
  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={location.pathname}
        className="stripes-overlay"
        aria-hidden="true"
      >
        {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
          <motion.span
            key={i}
            className="stripe"
            style={{ transformOrigin: i % 2 === 0 ? 'left' : 'right' }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{
              duration: 0.26,
              delay: i * 0.025,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
