import React, { useState } from 'react'

const ImageGenerator = () => {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState(0);
  const [steps, setSteps] = useState(10);
  const [guidanceScale, setGuidanceScale] = useState(0.5);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(300);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const API_TOKEN = "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";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setImage(null)
    setLoading(true)
    const res = await fetch('https://api-inference.huggingface.co/models/prompthero/openjourney', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        inputs: input,
        steps,
        guidance_scale: guidanceScale,
        seed,
        width,
        height,
      }),
    });
    const blob = await res.blob();
    setLoading(false)
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
      <h1 style={styles.heading}><label className='form-label'>Image</label> <label style={styles.gen}>Generator</label></h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            placeholder="Enter your text"
          />
        </div>
        <div style={styles.row}>
          <div style={styles.sliderContainer}>
            <label className="form-label">
              Steps: <input type='number' className='values' value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}/>
              <input
                type="range"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                style={styles.rangeInput}
                min={1}
                max={500}
              />
            </label>
          </div>
          <div style={styles.sliderContainer}>
            <label className="form-label">
              Guidance Scale: <input type='number' className='values' value={guidanceScale}
              onChange={(e) => setGuidanceScale(Number(e.target.value))}/>
              <input
                type="range"
                value={guidanceScale}
                onChange={(e) => setGuidanceScale(Number(e.target.value))}
                style={styles.rangeInput}
                step={0.1}
                min={1}
                max={20}
              />
            </label>
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.sliderContainer}>
            <label className="form-label">
              Width: <input type='number' className='values' value={width}
              onChange={(e) => setWidth(Number(e.target.value))}/>
              <input
                type="range"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                style={styles.rangeInput}
                min={128}
                max={1024}
              />
            </label>
          </div>
          <div style={styles.sliderContainer}>
            <label className="form-label">
              Height:<input type='number' className='values' value={height}
              onChange={(e) => setHeight(Number(e.target.value))}/>
              <input
                type="range"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                style={styles.rangeInput}
                min={128}
                max={1024}
              />
            </label>
          </div>
        </div>
        <div style={styles.row}>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            style={styles.input}
            placeholder="Enter seed"
          />
        </div>
        <div style={styles.row}>
          <button type="submit" className='btn' style={styles.button}>
            {
              loading ? "Loading.." : "Generate"
            }
          </button>
        </div>
      </form>
      {image && (
        <div style={styles.imageContainer}>
          <img src={image} alt="Generated" style={styles.image} />
          <div style={styles.downloadContainer}>
            <button onClick={handleDownload} className='btn' style={styles.downloadButton}>
              Download
            </button>
          </div>
        </div>
      )}
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
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
    width: '100%',
  },
  rangeInput: {
    width: '100%',
    marginBottom: '0.5rem',
  },
  sliderContainer: {
    flex: '1',
    marginRight: '1rem',
  },
  gen:{
    color: '#7559ff',
  },

  imageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
    marginRight: '1rem',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '1rem',
  },
  downloadContainer: {
    marginRight: '9.5rem',
  },
  downloadButton: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: '#0077ff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default ImageGenerator;
