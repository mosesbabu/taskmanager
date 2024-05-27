// src/components/IssueForm.js
import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const IssueForm = () => {
  const [complainant, setComplainant] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [assignee, setAssignee] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Bug', 'Feature Request', 'Improvement', 'Task', 'Other'];
  const assignees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Davis', 'Robert Brown'];

  const validationSchema = Yup.object({
    complainant: Yup.string().email('Invalid email format').required('Required'),
    phoneNumber: Yup.string()
      .matches(/^\+?\d{0,13}$/, 'Invalid phone number')
      .required('Required'),
    category: Yup.string().oneOf(categories, 'Invalid category').required('Required'),
    description: Yup.string().required('Required'),
    assignee: Yup.string().oneOf(assignees, 'Invalid assignee').required('Required'),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting issue:', { complainant, category, description, phoneNumber, assignee });

      const response = await axios.post('http://localhost:5000/api/issues', {
        complainant,
        category,
        description,
        phoneNumber,
        assignee
      });

      console.log('Response:', response);


      // Reset form fields after successful submission
      setComplainant('');
      setCategory('');
      setDescription('');
      setPhoneNumber('');
      setAssignee('');
      setError('');
      setSuccess('Issue submitted successfully. Tracking ID: ' + response.data.trackingId);
    } catch (err) {
      console.error('Error submitting the issue:', err);
      setError('Failed to submit the issue. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        
        <h2 className="text-2xl mb-4">Submit an Issue</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Complainant email</label>
          <input
            type="email"
            value={complainant}
            onChange={(e) => setComplainant(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="^\d+$"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assignee</label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select an assignee</option>
            {assignees.map((assig) => (
              <option key={assig} value={assig}>
                {assig}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
