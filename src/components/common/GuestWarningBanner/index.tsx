// Simplified GuestWarningBanner

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export const GuestWarningBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-yellow-500/10 border-b border-yellow-500/30 py-3"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <p className="text-sm text-yellow-200">
              <strong>Guest Mode:</strong> Your creations won't be saved. Sign up to keep them forever!
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-yellow-500/20 rounded transition-colors"
          >
            <X className="w-4 h-4 text-yellow-500" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
