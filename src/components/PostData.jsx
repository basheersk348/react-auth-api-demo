import React, { useState, useEffect } from 'react';

export default function PostData() {
  // 1. Setup state variables to hold data and handle loading/error states
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Run the fetch request on component mount
  useEffect(() => {
    // Define the endpoint URL provided
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    fetch(apiUrl)
      .then((response) => {
        // Check if the response was successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json(); // Convert raw response to JSON
      })
      .then((data) => {
        setPost(data); // Save fetched data into state
        setLoading(false); // Turn off loading state
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty array means this runs ONCE when the component loads

  // 3. Render loading or error screens while waiting
  if (loading) return <h3>Loading post data...</h3>;
  if (error) return <h3 style={{ color: 'red' }}>Error: {error}</h3>;

  // 4. Render the fetched data on the UI
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', margin: '16px' }}>
      <h2>Fetched Post Details</h2>
      <p><strong>Post ID:</strong> {post.id}</p>
      <p><strong>User ID:</strong> {post.userId}</p>
      <p><strong>Title:</strong> {post.title}</p>
      <p><strong>Body:</strong> {post.body}</p>
    </div>
  );
}