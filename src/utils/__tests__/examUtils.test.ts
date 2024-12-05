import { describe, it, expect } from 'vitest';
import { canRegisterForExam, formatDate } from '../examUtils';
import { Exam } from '../../types';

describe('examUtils', () => {
  describe('canRegisterForExam', () => {
    it('should return true when exam has capacity', () => {
      const exam: Exam = {
        id: '1',
        title: 'Test Exam',
        date: '2024-03-20T10:00',
        capacity: 2,
        registeredStudents: [{ id: '1', name: 'John Doe', email: 'john@example.com' }]
      };
      
      expect(canRegisterForExam(exam)).toBe(true);
    });

    it('should return false when exam is full', () => {
      const exam: Exam = {
        id: '1',
        title: 'Test Exam',
        date: '2024-03-20T10:00',
        capacity: 2,
        registeredStudents: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
        ]
      };
      
      expect(canRegisterForExam(exam)).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = '2024-03-20T10:00';
      const formatted = formatDate(date);
      expect(formatted).toMatch(/March 20, 2024/);
      expect(formatted).toMatch(/10:00/);
    });

    it('should handle invalid date gracefully', () => {
      const date = 'invalid-date';
      const formatted = formatDate(date);
      expect(formatted).toBe('Invalid Date');
    });
  });
});