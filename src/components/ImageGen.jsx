import React, { useState } from 'react';

const ImageGenerator = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState('');
  const API_TOKEN = process.env.REACT_APP_API_TOKEN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImage(null);
    setLoading(true);
    const newSeed = Math.floor(Math.random() * 1000000) + 1;
    const res = await fetch('https://api-inference.huggingface.co/models/prompthero/openjourney', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        inputs: input,
        seed: newSeed,
      }),
    });
    const blob = await res.blob();
    setLoading(false);
    setImage(window.URL.createObjectURL(blob));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'generated_image.png';
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          <label className='form-label'>Image</label> <label style={styles.gen}>Generator</label>
        </h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input
              type="text"
              value={input}
              className='Prompt'
              onChange={(e) => setInput(e.target.value)}
              style={{ ...styles.input, width: '100%' }}
              placeholder="Enter Your Prompt"
            />
          </div>
          <div style={styles.row} value={seed} onChange={(e) => setSeed(e.target.value)}></div>
          <div style={styles.row}>
            <button type="submit" className='btn' style={styles.button}>
              {loading ? "Loading.." : "Generate"}
            </button>
          </div>
        </form>
        {image && (
          <div style={styles.imageContainer} className='btn1'>
            <img src={image} alt="Generated" style={styles.image} />
            <div style={styles.downloadContainer}>
              <button onClick={handleDownload} className='btn' style={styles.downloadButton}>
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '2rem',
    backgroundColor: '#060013',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: '2rem',
    width: '35rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ffdd02',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  imageContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '500px',
    border: '1px solid white',
  },
  downloadContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  downloadButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ffdd02',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  gen: {
    color: '#ffdd02',
  },
};

export default ImageGenerator;
