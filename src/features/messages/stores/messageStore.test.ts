import { describe, it, expect, beforeEach } from 'vitest';
import { useMessageStore } from './messageStore';

describe('messageStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useMessageStore.getState().resetForm();
    // Clear persisted messages
    useMessageStore.setState({ messages: [] });
  });

  it('starts with default form data', () => {
    const state = useMessageStore.getState();
    expect(state.formData.sender).toBe('');
    expect(state.formData.receiver).toBe('');
    expect(state.formData.message).toBe('');
    expect(state.currentTemplate).toBe('love');
  });

  it('updates form data partially', () => {
    useMessageStore.getState().setFormData({ sender: 'Alice' });
    const state = useMessageStore.getState();
    expect(state.formData.sender).toBe('Alice');
    expect(state.formData.receiver).toBe('');
  });

  it('changes template', () => {
    useMessageStore.getState().setTemplate('birthday');
    expect(useMessageStore.getState().currentTemplate).toBe('birthday');
  });

  it('resets form to initial state', () => {
    useMessageStore.getState().setFormData({ sender: 'Alice', receiver: 'Bob' });
    useMessageStore.getState().setTemplate('sorry');
    useMessageStore.getState().resetForm();

    const state = useMessageStore.getState();
    expect(state.formData.sender).toBe('');
    expect(state.formData.receiver).toBe('');
    expect(state.currentTemplate).toBe('love');
    expect(state.generatedSlug).toBeNull();
  });

  it('creates a message and generates a slug', () => {
    useMessageStore.getState().setFormData({
      sender: 'Alice',
      receiver: 'Bob',
      message: 'Hello!',
    });
    useMessageStore.getState().setTemplate('gratitude');

    const message = useMessageStore.getState().createMessage();

    expect(message.template).toBe('gratitude');
    expect(message.data.sender).toBe('Alice');
    expect(message.data.receiver).toBe('Bob');
    expect(message.data.message).toBe('Hello!');
    expect(message.slug).toMatch(/^for-bob-/);
    expect(message.id).toBeDefined();
    expect(useMessageStore.getState().messages).toHaveLength(1);
    expect(useMessageStore.getState().generatedSlug).toBe(message.slug);
  });

  it('retrieves a message by slug', () => {
    useMessageStore.getState().setFormData({
      sender: 'Alice',
      receiver: 'Bob',
      message: 'Test',
    });
    const created = useMessageStore.getState().createMessage();

    const found = useMessageStore.getState().getMessage(created.slug);
    expect(found).toBeDefined();
    expect(found?.id).toBe(created.id);
  });

  it('returns undefined for unknown slug', () => {
    expect(useMessageStore.getState().getMessage('nonexistent')).toBeUndefined();
  });

  it('deletes a message', () => {
    useMessageStore.getState().setFormData({
      sender: 'Alice',
      receiver: 'Bob',
      message: 'Test',
    });
    const created = useMessageStore.getState().createMessage();
    expect(useMessageStore.getState().messages).toHaveLength(1);

    useMessageStore.getState().deleteMessage(created.id);
    expect(useMessageStore.getState().messages).toHaveLength(0);
  });

  it('sanitizes user input in created messages', () => {
    useMessageStore.getState().setFormData({
      sender: '<script>alert("xss")</script>',
      receiver: '<img src=x onerror=alert(1)>Bob',
      message: 'Hello <b>world</b>',
    });

    const message = useMessageStore.getState().createMessage();

    expect(message.data.sender).not.toContain('<script>');
    expect(message.data.receiver).not.toContain('<img');
    expect(message.data.message).not.toContain('<b>');
    expect(message.data.message).toContain('world');
  });
});
