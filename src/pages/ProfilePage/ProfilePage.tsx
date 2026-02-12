import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth';
import { User, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { updateProfile } from 'firebase/auth';

const inputClasses =
  'w-full px-4 py-3 pl-12 bg-glass-bg border border-glass-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all';

const ProfilePage = () => {
  const { user } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [savingName, setSavingName] = useState(false);

  if (!user) return null;

  const userInitial =
    user.displayName?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    'U';

  const handleSaveDisplayName = async () => {
    if (!displayName.trim()) {
      toast.error('Display name cannot be empty');
      return;
    }
    setSavingName(true);
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      toast.success('Display name updated');
      setIsEditingName(false);
    } catch {
      toast.error('Failed to update display name');
    } finally {
      setSavingName(false);
    }
  };

  return (
    <PageShell>
      <div className="py-24 md:py-32">
        <Container size="md">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              My Profile
            </h1>
            <p className="text-text-secondary">
              Your personal identity on EmotionCreator.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">
                  Personal Information
                </h2>
              </div>

              {/* Avatar + basic info */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold flex-shrink-0">
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
                  <p className="text-lg font-medium truncate">
                    {user.displayName || 'No display name set'}
                  </p>
                  <p className="text-sm text-text-secondary truncate">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {user.emailVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                        <AlertCircle className="w-3 h-3" />
                        Not verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Display Name field */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-text-secondary font-medium">
                    Display Name
                  </label>
                  {isEditingName ? (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className={inputClasses}
                          placeholder="Enter display name"
                          autoFocus
                        />
                      </div>
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={handleSaveDisplayName}
                        disabled={savingName}
                      >
                        {savingName ? 'Saving...' : 'Save'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsEditingName(false);
                          setDisplayName(user.displayName || '');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">
                        {user.displayName || 'Not set'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        onClick={() => setIsEditingName(true)}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <label className="text-sm text-text-secondary font-medium">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <span className="text-foreground">{user.email}</span>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default ProfilePage;
