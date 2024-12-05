import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExamForm from '../ExamForm';

describe('ExamForm', () => {
  it('should reset form after submission', async () => {
    const onSubmit = vi.fn();

    render(<ExamForm onSubmit={onSubmit} />);

    const titleInput = screen.getByPlaceholderText('Enter exam title');
    const dateInput = screen.getByPlaceholderText('Select exam date');
    const capacityInput = screen.getByPlaceholderText('Enter capacity');

    
    fireEvent.change(titleInput, { target: { value: 'Test Exam' } });
    fireEvent.change(dateInput, { target: { value: '2024-03-20T10:00' } });
    fireEvent.change(capacityInput, { target: { value: '30' } });

    expect(titleInput).toHaveValue('Test Exam');
    expect(dateInput).toHaveValue('2024-03-20T10:00');
    expect(capacityInput).toHaveValue(30);

    const submitButton = screen.getByText(/create exam/i);
    fireEvent.click(submitButton);


  });
});
