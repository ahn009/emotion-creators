import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout';
import { Container } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth';
import {
  User,
  Mail,
  Lock,
  KeyRound,
  Send,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
} from 'firebase/auth';
import { sendInviteEmail } from './invite-service';

const inputClasses =
  'w-full px-4 py-3 pl-12 bg-glass-bg border border-glass-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all';

const sectionCardClasses =
  'glass-card rounded-2xl p-6 md:p-8';

const ProfilePage = () => {
  const { user, resetPassword } = useAuth();

  // Display name editing
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [savingName, setSavingName] = useState(false);

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Password reset
  const [resetSent, setResetSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  // Invite friends
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [sendingInvite, setSendingInvite] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  if (!user) return null;

  const userInitial = user.displayName?.charAt(0).toUpperCase()
    || user.email?.charAt(0).toUpperCase()
    || 'U';

  const isPasswordProvider = user.providerData.some(
    (p) => p.providerId === 'password'
  );

  // --- Handlers ---

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setChangingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      const messages: Record<string, string> = {
        'auth/wrong-password': 'Current password is incorrect',
        'auth/weak-password': 'New password is too weak (min 6 characters)',
        'auth/requires-recent-login': 'Please sign out and sign back in, then try again',
      };
      toast.error(messages[firebaseError.code || ''] || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return;
    setSendingReset(true);
    try {
      await resetPassword(user.email);
      setResetSent(true);
      toast.success('Password reset email sent');
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setSendingReset(false);
    }
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!friendName.trim() || !friendEmail.trim()) {
      toast.error('Please fill in both name and email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(friendEmail.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSendingInvite(true);
    try {
      await sendInviteEmail({
        friendName: friendName.trim(),
        friendEmail: friendEmail.trim(),
        senderName: user.displayName || user.email?.split('@')[0] || 'A friend',
      });
      setInviteSent(true);
      toast.success(`Invite sent to ${friendName}!`);
      // Reset after brief delay so user sees success state
      setTimeout(() => {
        setFriendName('');
        setFriendEmail('');
        setInviteSent(false);
      }, 3000);
    } catch {
      toast.error('Failed to send invite. Please try again.');
    } finally {
      setSendingInvite(false);
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
              Manage your account, security, and invite friends.
            </p>
          </motion.div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {/* ───────── USER INFO SECTION ───────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={sectionCardClasses}
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">
                  Account Information
                </h2>
              </div>

              <div className="flex items-center gap-4 mb-6">
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

              {/* Editable display name */}
              <div className="space-y-3">
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

                <div className="space-y-1">
                  <label className="text-sm text-text-secondary font-medium">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <span className="text-foreground">{user.email}</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ───────── PASSWORD MANAGEMENT SECTION ───────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={sectionCardClasses}
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">
                  Password & Security
                </h2>
              </div>

              {isPasswordProvider ? (
                <>
                  {/* Change Password Form */}
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={inputClasses}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="New password (min 6 characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={inputClasses}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={inputClasses}
                        required
                        minLength={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full"
                      disabled={changingPassword}
                    >
                      {changingPassword ? 'Changing Password...' : 'Change Password'}
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-glass-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-background px-3 text-text-muted">or</span>
                    </div>
                  </div>

                  {/* Reset via email */}
                  {resetSent ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-emerald-300">
                        Reset link sent to <strong>{user.email}</strong>. Check your inbox.
                      </p>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full border-glass-border"
                      onClick={handleResetPassword}
                      disabled={sendingReset}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {sendingReset ? 'Sending...' : 'Send Password Reset Email'}
                    </Button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <p className="text-sm text-blue-300">
                    You signed in with Google. Password management is handled through your Google account.
                  </p>
                </div>
              )}
            </motion.section>

            {/* ───────── INVITE FRIENDS SECTION ───────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={sectionCardClasses}
            >
              <div className="flex items-center gap-3 mb-2">
                <UserPlus className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">
                  Invite Your Friends
                </h2>
              </div>
              <p className="text-sm text-text-secondary mb-6">
                Share EmotionCreator with your friends and let them create beautiful messages too.
              </p>

              {inviteSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-6"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-emerald-300 font-medium">
                    Invite sent successfully!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSendInvite} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Friend's name"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      placeholder="Friend's email address"
                      value={friendEmail}
                      onChange={(e) => setFriendEmail(e.target.value)}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full gap-2"
                    disabled={sendingInvite}
                  >
                    <Send className="w-4 h-4" />
                    {sendingInvite ? 'Sending Invite...' : 'Send Invite'}
                  </Button>
                </form>
              )}
            </motion.section>
          </div>
        </Container>
      </div>
    </PageShell>
  );
};

export default ProfilePage;
