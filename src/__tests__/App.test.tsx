import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  it('should render main components', () => {
    render(<App />);
    
    expect(screen.getByText('Exam Registration System')).toBeInTheDocument();
    expect(screen.getByText('Create New Exam')).toBeInTheDocument();
    expect(screen.getByText('Available Exams')).toBeInTheDocument();
  });

  it('should create new exam and display it in the list', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.type(screen.getByLabelText(/exam title/i), 'Test Exam');
    await user.type(screen.getByLabelText(/date and time/i), '2024-03-20T10:00');
    await user.clear(screen.getByLabelText(/capacity/i));
    await user.type(screen.getByLabelText(/capacity/i), '20');
    
    await user.click(screen.getByRole('button', { name: /create exam/i }));
    
    expect(screen.getByText('Test Exam')).toBeInTheDocument();
  });

  it('should register student and show logged in status', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
  
    await user.click(screen.getByRole('button', { name: /register/i }));
    
    expect(screen.getByText(/logged in as:/i)).toBeInTheDocument();
  });
});
