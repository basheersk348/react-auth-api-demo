import React, { useState, useEffect } from 'react';

export default function PostData() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch a single post object from the endpoint
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch post data');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data); // Save the single post object
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading post...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>API Post Details</h3>
      {post && (
        <div 
          style={{ 
            border: '1px solid #ddd', 
            borderRadius: '6px', 
            padding: '15px', 
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 5px 0' }}>User ID: {post.userId} | Post ID: {post.id}</p>
          <h4 style={{ margin: '0 0 10px 0', color: '#007bff', textTransform: 'capitalize' }}>
            {post.title}
          </h4>
          <p style={{ margin: 0, color: '#555', lineHeight: '1.5' }}>{post.body}</p>
        </div>
      )}
    </div>
  );
}