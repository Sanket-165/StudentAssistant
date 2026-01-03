import React, { useState } from 'react';
import axios from 'axios';

const StudentAssistant = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('explain');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse(null);

    if (!input.trim()) {
      setError('Please enter some text.');
      setLoading(false);
      return;
    }

    try {
      // Connect to the Backend API
      const res = await axios.post('http://localhost:5000/api/ai/generate', {
        prompt: input,
        mode: mode
      });

      setResponse(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to render MCQs if the response is JSON
  const renderResponse = () => {
    if (!response) return null;

    if (mode === 'mcq' && Array.isArray(response)) {
      return (
        <div>
          <h3>Generated MCQs:</h3>
          {response.map((q, index) => (
            <div key={index} className="mcq-card">
              <p><strong>Q{index + 1}: {q.question}</strong></p>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p style={{ color: 'green', fontSize: '0.9em' }}>Answer: {q.answer}</p>
            </div>
          ))}
        </div>
      );
    }

    // Default Text Rendering (Markdown style handling can be added here)
    return (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {response}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AI Student Assistant 🤖</h1>
        <p>Your personalized study companion</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Task:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="explain">Explain a Concept (Simple)</option>
            <option value="summarize">Summarize Text</option>
            <option value="mcq">Generate MCQs</option>
            <option value="improve">Improve Writing</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your Input:</label>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={mode === 'explain' ? "Enter a concept like 'Redux'..." : "Enter text here..."}
          />
        </div>

        <button type="submit" disabled={loading}>
  {loading ? (
    <>
      <div className="spinner"></div> Generating...
    </>
  ) : (
    <>
      Get AI Help ✨
    </>
  )}
</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {response && (
        <div className="result-section">
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default StudentAssistant;