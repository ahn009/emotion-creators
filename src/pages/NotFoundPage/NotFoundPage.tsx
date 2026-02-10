// 404 Not Found page

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config';
import { Home, Heart } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <PageShell>
      <div className="min-h-screen flex items-center justify-center py-20">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-8xl mb-8"
            >
              💔
            </motion.div>
            
            <h1 className="font-display text-5xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
              This message doesn't exist or may have been removed. 
              Why not create your own?
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={ROUTES.HOME}>
                <Button variant="outline" size="lg">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </Link>
              <Link to={ROUTES.CREATE}>
                <Button variant="gradient" size="lg">
                  <Heart className="w-4 h-4" />
                  Create Message
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </PageShell>
  );
};

export default NotFoundPage;
