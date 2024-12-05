import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentRegistration from '../StudentRegistration';

describe('StudentRegistration', () => {
  it('should render registration form fields', () => {
    render(<StudentRegistration onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('should call onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<StudentRegistration onSubmit={onSubmit} />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(screen.getByRole('button', { name: /register/i }));
    
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    });
  });

  it('should reset form after submission', async () => {
    const user = userEvent.setup();
    render(<StudentRegistration onSubmit={() => {}} />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(screen.getByRole('button', { name: /register/i }));
    
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<StudentRegistration onSubmit={() => {}} />);
    
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    await user.type(emailInput, 'invalid-email');
    
    expect(emailInput.validity.valid).toBe(false);
  });
});