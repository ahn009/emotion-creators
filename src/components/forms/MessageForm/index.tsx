// Message Form component

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { messageSchema, MessageFormValues } from '@/features/messages/validators';
import { useMessageStore } from '@/features/messages/stores/messageStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/cn';

interface MessageFormProps {
  onSubmit: (data: MessageFormValues) => void | Promise<void>;
  submitLabel?: string;
  isSubmitting?: boolean;
}

type Tone = 'Romantic' | 'Funny' | 'Formal' | 'Heartfelt' | 'Casual';

const tones: Tone[] = ['Romantic', 'Funny', 'Formal', 'Heartfelt', 'Casual'];

export const MessageForm = ({ onSubmit, submitLabel = 'Create Share Link', isSubmitting = false }: MessageFormProps) => {
  const { formData, setFormData, currentTemplate } = useMessageStore();
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [tone, setTone] = useState<Tone>('Heartfelt');
  const [context, setContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
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

  const onFormSubmit = async (data: MessageFormValues) => {
    setFormData(data);
    await onSubmit(data);
  };

  const handleGenerateMessage = async () => {
    const values = getValues();

    if (!values.sender || !values.receiver) {
      toast.error('Add both names before using AI');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: currentTemplate,
          senderName: values.sender,
          recipientName: values.receiver,
          tone,
          context,
        }),
      });

      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok || !result.message) {
        throw new Error(result.error || 'AI generation failed');
      }

      setValue('message', result.message, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      setFormData({ message: result.message, options: { aiEnhanced: true } });
      setIsAiGenerated(true);
      setShowAiPanel(false);
      toast.success('AI draft added');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'AI generation failed';
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
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
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <label className="block text-sm font-medium">Your Message</label>
          <div className="flex items-center gap-2">
            {isAiGenerated && (
              <button
                type="button"
                onClick={() => setIsAiGenerated(false)}
                className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary"
              >
                AI-generated
                <X className="h-3 w-3" />
              </button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAiPanel((current) => !current)}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Write with AI
            </Button>
          </div>
        </div>
        {showAiPanel && (
          <div className="mb-4 rounded-2xl border border-glass-border bg-background/40 p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((toneOption) => (
                  <button
                    key={toneOption}
                    type="button"
                    onClick={() => setTone(toneOption)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs transition-colors',
                      tone === toneOption
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-glass-border text-text-secondary hover:text-foreground'
                    )}
                  >
                    {toneOption}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Add any specific details (optional)
              </label>
              <textarea
                value={context}
                onChange={(event) => setContext(event.target.value)}
                rows={3}
                className={cn(inputClasses, 'resize-none text-sm')}
                placeholder="A shared memory, inside joke, what you want to say..."
              />
            </div>
            <Button
              type="button"
              variant="gradient"
              size="sm"
              onClick={handleGenerateMessage}
              disabled={isGenerating}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        )}
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
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Creating...' : submitLabel}
        </Button>
      </motion.div>
    </form>
  );
};
