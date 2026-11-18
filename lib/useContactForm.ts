import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

/** Posts the contact form to Formspree. Shared by every contact UI on the site. */
export function useContactForm() {
  const [status, setStatus] = useState<ContactStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;

    try {
      const response = await fetch(PERSONAL_INFO.contactFormAction, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return { status, setStatus, handleSubmit };
}
