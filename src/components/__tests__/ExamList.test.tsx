import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExamList from '../ExamList';
import { Exam } from '../../types';

describe('ExamList', () => {
  const mockExams: Exam[] = [
    {
      id: '1',
      title: 'Mathematics',
      date: '2024-03-20T10:00',
      capacity: 2,
      registeredStudents: [{ id: '1', name: 'John Doe', email: 'john@example.com' }]
    },
    {
      id: '2',
      title: 'Physics',
      date: '2024-03-21T14:00',
      capacity: 1,
      registeredStudents: [{ id: '2', name: 'Jane Doe', email: 'jane@example.com' }]
    }
  ];

  it('should render exam list correctly', () => {
    render(<ExamList exams={mockExams} onRegister={() => {}} />);
    
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
    expect(screen.getByText('Physics')).toBeInTheDocument();
  });

  it('should display registration status correctly', () => {
    render(<ExamList exams={mockExams} onRegister={() => {}} />);
    
    expect(screen.getByText('1 / 2 students registered')).toBeInTheDocument();
    expect(screen.getByText('1 / 1 students registered')).toBeInTheDocument();
  });

  it('should call onRegister when register button is clicked', async () => {
    const user = userEvent.setup();
    const onRegister = vi.fn();
    render(<ExamList exams={mockExams} onRegister={onRegister} />);
    
    const registerButtons = screen.getAllByRole('button', { name: /register/i });
    await user.click(registerButtons[0]);
    
    expect(onRegister).toHaveBeenCalledWith('1');
  });

  it('should disable register button when exam is full', () => {
    const fullExam: Exam[] = [{
      id: '3',
      title: 'Chemistry',
      date: '2024-03-22T09:00',
      capacity: 1,
      registeredStudents: [{ id: '3', name: 'Bob Smith', email: 'bob@example.com' }]
    }];
    
    render(<ExamList exams={fullExam} onRegister={() => {}} />);
    
    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(registerButton).toBeDisabled();
  });
});