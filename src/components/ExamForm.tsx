import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ExamFormData } from '../types';

interface ExamFormProps {
  onSubmit: (data: ExamFormData) => void;
}

export default function ExamForm({ onSubmit }: ExamFormProps) {
  const [formData, setFormData] = useState<ExamFormData>({
    title: '',
    date: '',
    capacity: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', date: '', capacity: 10 });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      aria-label="exam-form"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Exam</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Exam Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter exam title" // Added placeholder
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date and Time
        </label>
        <input
          type="datetime-local"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Select exam date" // Added placeholder
          required
        />
      </div>

      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
          Capacity
        </label>
        <input
          type="number"
          id="capacity"
          min="1"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter capacity" // Added placeholder
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Exam
      </button>
    </form>
  );
}
