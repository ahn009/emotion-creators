// Enhanced Interactive Navbar with Auth

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Logo, Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config/constants';
import { Sparkles, LogIn, LogOut, User, Menu, X, Home, FileText } from 'lucide-react';
import { useAuth } from '@/features/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navLinks = [
    { to: ROUTES.HOME, label: 'Home', icon: Home },
    { to: ROUTES.CREATE, label: 'Create', icon: Sparkles },
  ];

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-2xl border-b border-glass-border shadow-lg shadow-primary/5' 
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo with hover effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Nav Links */}
            <div className="flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link key={link.to} to={link.to}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        size="sm"
                        className={`gap-2 transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30' 
                            : 'hover:bg-glass-bg hover:text-primary'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Button>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-glass-border bg-glass-bg hover:bg-glass-bg/80 hover:border-primary/50 transition-all duration-300"
                      >
                        <User className="w-4 h-4" />
                        <span className="max-w-[100px] truncate">
                          {user.email?.split('@')[0] || 'User'}
                        </span>
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-background/95 backdrop-blur-xl border-glass-border"
                  >
                    <DropdownMenuLabel className="text-primary">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-glass-border" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-glass-bg">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-glass-bg">
                      <FileText className="w-4 h-4 mr-2" />
                      My Messages
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-glass-border" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer hover:bg-destructive/10 text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to={ROUTES.SIGN_IN}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 hover:bg-glass-bg hover:text-primary transition-all duration-300"
                      >
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to={ROUTES.SIGN_UP}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="gradient"
                        size="sm"
                        className="gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                      >
                        <Sparkles className="w-4 h-4" />
                        Get Started
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-glass-bg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-glass-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-primary to-secondary text-white'
                            : 'hover:bg-glass-bg'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-glass-border space-y-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-text-secondary">
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={ROUTES.SIGN_IN}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-glass-bg transition-all"
                        >
                          <LogIn className="w-5 h-5" />
                          <span className="font-medium">Sign In</span>
                        </motion.div>
                      </Link>
                      <Link
                        to={ROUTES.SIGN_UP}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white transition-all"
                        >
                          <Sparkles className="w-5 h-5" />
                          <span className="font-medium">Get Started</span>
                        </motion.div>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};
