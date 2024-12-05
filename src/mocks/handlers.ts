import { http, HttpResponse } from 'msw';
import { Exam } from '../types';

export const handlers = [
  http.get('/api/exams', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Mathematics',
        date: '2024-03-20T10:00',
        capacity: 30,
        registeredStudents: []
      }
    ] as Exam[]);
  }),

  http.post('/api/exams', async ({ request }) => {
    const exam = await request.json();
  
    if (typeof exam === 'object' && exam !== null) {
      return HttpResponse.json({ ...exam, id: crypto.randomUUID() } as Exam);
    }
  
    throw new Error('Invalid exam object');
  }),

  http.post('/api/exams/:examId/register', ({ params }) => {
    const { examId } = params;
    return HttpResponse.json({ success: true, examId });
  })
];