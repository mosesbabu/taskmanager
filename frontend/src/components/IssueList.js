import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/issues');
        setIssues(response.data);
      } catch (err) {
        setError('Failed to fetch issues');
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl mb-4">Issues List</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Tracking ID</th>
              <th className="px-4 py-2">Complainant</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Assignee</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr key={issue._id}>
                <td className="border px-4 py-2">{issue.trackingId}</td>
                <td className="border px-4 py-2">{issue.complainant}</td>
                <td className="border px-4 py-2">{issue.category}</td>
                <td className="border px-4 py-2">{issue.description}</td>
                <td className="border px-4 py-2">{issue.phoneNumber}</td>
                <td className="border px-4 py-2">{issue.assignee}</td>
                <td className="border px-4 py-2">{issue.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueList;
