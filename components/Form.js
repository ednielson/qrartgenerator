import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Form() {
  const [url, setUrl] = useState('');
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStyles = async () => {
      const response = await fetch('/api/styles');
      const data = await response.json();
      setStyles(data);
    };

    fetchStyles();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // If no style is selected, use the first one as default
    const styleToUse = selectedStyle ? selectedStyle : styles[0]._id;
    router.push(`/api/qr?style=${styleToUse}&url=${url}`);
  };

  return (
    <form onSubmit={handleSubmit}>
     
      <div className="form-control w-full max-w-xs">
            <label className="label  mt-6">
              <span className="text-m font-semibold">QR-code URL</span>
            </label>
            <input type="text" placeholder="https://yoururl.com" className="input input-bordered w-full max-w-xs" value={url} onChange={(e) => setUrl(e.target.value)}  />
            <label className="label">
              <span className="label-text-alt">The URL your QR-code opens when scanned</span>
            </label>
      </div>

      <label className='label mb-4 mt-6'>
      <span className="text-m font-semibold">Pick a style: </span> 
      <div className="badge badge-primary badge-outline">{selectedStyle ? styles.find(style => style._id === selectedStyle).name : 'primary'}</div>
 </label>
       
        <div className="xs:grid-cols-2 sm:grid-cols-3 md:grid grid-cols-4 lg:grid-cols-8 gap-1 mt-3">
          {styles.map((style) => (
            <div key={style._id} className={`style-item ${selectedStyle === style._id ? 'border-4 border-error' : ''}`} onClick={() => setSelectedStyle(style._id)}>
              <img src={style.imagePath} alt={style.name} style={{ cursor: 'pointer' }} />
            </div>
          ))}
        </div>
        
     <button className="btn btn-active btn-primary btn-lg mt-6" type="submit">Generate</button>

    </form>
  );
}

