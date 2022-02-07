import { useEffect, useState } from 'react';

export default function HitCounter({ slug }) {
  const [hits, setHits] = useState(null);

  useEffect(() => {
    // Don't count hits on localhost
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Invoke the function by making a request.
    // Update the URL to match the format of your platform.
    fetch(`/api/register-hit?slug=${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.hits === 'number') {
          setHits(json.hits);
        }
      });
  }, [slug]);

  return hits ? (
    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
      {hits} {hits !== 1 ? 'Views' : 'View'}
    </div>
  ) : null;
}
