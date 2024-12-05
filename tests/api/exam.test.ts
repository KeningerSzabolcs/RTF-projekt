import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { server } from '../../src/mocks/server';

describe('Exam API', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch exams', async () => {
    const response = await fetch('/api/exams');
    const exams = await response.json();
    
    expect(response.ok).toBe(true);
    expect(Array.isArray(exams)).toBe(true);
    expect(exams[0]).toHaveProperty('title');
  });

  it('should create a new exam', async () => {
    const examData = {
      title: 'New Test Exam',
      date: '2024-03-21T14:00',
      capacity: 25
    };

    const response = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(examData)
    });

    const newExam = await response.json();
    expect(response.ok).toBe(true);
    expect(newExam).toHaveProperty('id');
    expect(newExam.title).toBe(examData.title);
  });
});