import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo, Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/config/constants';
import {
  Sparkles,
  LogIn,
  LogOut,
  User,
  Menu,
  X,
  FileText,
  Layout,
  Info,
  Shield,
  Lock,
  Settings,
} from 'lucide-react';
import { useAuth } from '@/features/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavLink {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isHash?: boolean;
}

const GUEST_NAV_LINKS: NavLink[] = [
  { to: ROUTES.TEMPLATES, label: 'Templates', icon: Layout },
  { to: '/#how-it-works', label: 'How it Works', icon: Info, isHash: true },
  { to: ROUTES.PRIVACY, label: 'Privacy', icon: Shield },
];

const AUTH_NAV_LINKS: NavLink[] = [
  { to: ROUTES.TEMPLATES, label: 'Templates', icon: Layout },
  { to: ROUTES.MY_MESSAGES, label: 'My Messages', icon: FileText },
];

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const centerNavLinks = user ? AUTH_NAV_LINKS : GUEST_NAV_LINKS;

  const userInitial = user?.displayName?.charAt(0).toUpperCase()
    || user?.email?.charAt(0).toUpperCase()
    || 'U';

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
          {/* LEFT - Logo (single instance, never duplicated) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="flex-shrink-0"
          >
            <Logo />
          </motion.div>

          {/* CENTER - Navigation links (auth-aware) */}
          <div className="hidden lg:flex items-center gap-1">
            {centerNavLinks.map((link) => {
              const isActive = link.isHash
                ? false
                : location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm transition-all duration-300 ${
                      isActive
                        ? 'text-primary bg-glass-bg'
                        : 'text-text-secondary hover:text-foreground hover:bg-glass-bg'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeCenterNav"
                        className="absolute -bottom-1 left-2 right-2 h-0.5 bg-primary/60 rounded-full"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* RIGHT - Actions (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Primary CTA */}
            <Link to={ROUTES.CREATE}>
              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="gradient"
                  size="sm"
                  className="gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  {user ? 'Create' : 'Create Message'}
                </Button>
              </motion.div>
            </Link>

            {user ? (
              /* ---- AUTHENTICATED STATE ---- */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-semibold ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300 focus:outline-none"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      userInitial
                    )}
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-60 bg-background/95 backdrop-blur-xl border-glass-border shadow-xl shadow-black/20 rounded-xl p-1"
                >
                  {/* User info header */}
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-glass-border" />
                  <DropdownMenuItem
                    onClick={() => navigate(ROUTES.PROFILE)}
                    className="cursor-pointer rounded-lg mx-1 px-3 py-2.5 hover:bg-glass-bg focus:bg-glass-bg transition-colors"
                  >
                    <User className="w-4 h-4 mr-3 text-text-secondary" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate(ROUTES.MY_MESSAGES)}
                    className="cursor-pointer rounded-lg mx-1 px-3 py-2.5 hover:bg-glass-bg focus:bg-glass-bg transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-3 text-text-secondary" />
                    My Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate(ROUTES.PROFILE)}
                    className="cursor-pointer rounded-lg mx-1 px-3 py-2.5 hover:bg-glass-bg focus:bg-glass-bg transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3 text-text-secondary" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-glass-border" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer rounded-lg mx-1 px-3 py-2.5 hover:bg-destructive/10 text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* ---- GUEST STATE ---- */
              <>
                <Link to={ROUTES.SIGN_IN}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-secondary hover:text-foreground hover:bg-glass-bg transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 text-primary transition-all duration-300"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      Unlock Features
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
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
              <div className="py-4 space-y-1">
                {/* Primary CTA */}
                <Link to={ROUTES.CREATE}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">
                      {user ? 'Create' : 'Create Message'}
                    </span>
                  </motion.div>
                </Link>

                {/* Auth-aware navigation links */}
                {centerNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = link.isHash
                    ? false
                    : location.pathname === link.to;
                  return (
                    <Link key={link.to} to={link.to}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-glass-bg text-primary'
                            : 'text-text-secondary hover:bg-glass-bg hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}

                {/* Auth section */}
                <div className="pt-3 mt-2 border-t border-glass-border space-y-1">
                  {user ? (
                    <>
                      {/* User info */}
                      <div className="flex items-center gap-3 px-4 py-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-semibold flex-shrink-0">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt="Avatar"
                              className="w-full h-full rounded-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            userInitial
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-text-secondary truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Link to={ROUTES.PROFILE}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-glass-bg transition-all"
                        >
                          <User className="w-5 h-5 text-text-secondary" />
                          <span className="font-medium">My Profile</span>
                        </motion.div>
                      </Link>
                      <Link to={ROUTES.PROFILE}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-glass-bg transition-all"
                        >
                          <Settings className="w-5 h-5 text-text-secondary" />
                          <span className="font-medium">Account Settings</span>
                        </motion.div>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to={ROUTES.SIGN_IN}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-glass-bg transition-all"
                        >
                          <LogIn className="w-5 h-5" />
                          <span className="font-medium">Sign In</span>
                        </motion.div>
                      </Link>
                      <Link to={ROUTES.SIGN_UP}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg border border-primary/30 text-primary transition-all"
                        >
                          <Lock className="w-5 h-5" />
                          <span className="font-medium">Unlock Features</span>
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
