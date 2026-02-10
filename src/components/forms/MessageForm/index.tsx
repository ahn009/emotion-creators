// Message Form component

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { messageSchema, MessageFormValues } from '@/features/messages/validators';
import { useMessageStore } from '@/features/messages/stores/messageStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/cn';

interface MessageFormProps {
  onSubmit: () => void;
}

export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const { formData, setFormData, currentTemplate } = useMessageStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    mode: 'onBlur',
    defaultValues: {
      sender: formData.sender,
      receiver: formData.receiver,
      message: formData.message,
    },
  });

  const onFormSubmit = (data: MessageFormValues) => {
    setFormData(data);
    onSubmit();
  };

  const inputClasses = cn(
    'w-full px-4 py-3 rounded-xl',
    'bg-glass-bg border border-glass-border',
    'text-foreground placeholder:text-text-muted',
    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
    'transition-all duration-200'
  );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <input
          {...register('sender')}
          placeholder="Enter your name"
          className={inputClasses}
          aria-invalid={!!errors.sender}
        />
        {errors.sender && (
          <p className="mt-1 text-sm text-destructive">{errors.sender.message}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium mb-2">Recipient's Name</label>
        <input
          {...register('receiver')}
          placeholder="Who is this for?"
          className={inputClasses}
          aria-invalid={!!errors.receiver}
        />
        {errors.receiver && (
          <p className="mt-1 text-sm text-destructive">{errors.receiver.message}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-medium mb-2">Your Message</label>
        <textarea
          {...register('message')}
          placeholder={
            currentTemplate === 'love' 
              ? 'Pour your heart out...' 
              : currentTemplate === 'sorry'
              ? 'Speak from the heart...'
              : 'Make their day special...'
          }
          rows={6}
          className={cn(inputClasses, 'resize-none')}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button 
          type="submit" 
          variant="gradient" 
          size="lg" 
          className="w-full"
          disabled={!isValid}
        >
          Preview Message
        </Button>
      </motion.div>
    </form>
  );
};
