import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ButtonCheckoutCTA from './ButtonCheckoutCTA';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Form() {
  const [url, setUrl] = useState('');
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStyles = async () => {
      const response = await fetch('/api/styles');
      const data = await response.json();
      setStyles(data);
      setLoading(false);
    };

    fetchStyles();
  }, []);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch('/api/credits');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCredits(data.credits);
      } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
      }
    };

    fetchCredits();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const styleToUse = selectedStyle ? selectedStyle : styles[0]._id;
    router.push({
      pathname: '/api/generateQR',
      query: {
        input_url: url,
        styleId: styleToUse,
        creator: session.user.id
      },
    });
  };


  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='text-m'>Credits left: <b>{credits}</b></p>
      {credits === 0 &&  <ButtonCheckoutCTA/>
      }
      <div className="form-control w-full max-w-xs">
            <label className="label  mt-6">
              <span className="text-m font-semibold">QR-code URL</span>
            </label>
            <input type="url" placeholder="https://yoururl.com" className="input input-bordered w-full max-w-xs" value={url} onChange={(e) => setUrl(e.target.value)} required pattern="https?://.+" title="Include 'http://' or 'https://' in your URL." />
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
              <Image src={style.imagePath} alt={style.name} width={300} height={300} style={{ cursor: 'pointer' }} />
            </div>
          ))}
        </div>
        
     <button className="btn btn-active btn-primary btn-lg mt-6" type="submit" disabled={credits === 0 || !selectedStyle}>Generate</button>

    </form>
  );
}



