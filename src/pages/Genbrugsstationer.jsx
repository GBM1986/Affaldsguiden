import React, { useEffect, useState } from 'react';
import { useSupabase } from '../providers/SupabaseProvider';
import { Link } from 'react-router-dom';

export const Genbrugsstationer = () => {
  const { supabase } = useSupabase();
  const [stationer, setStationer] = useState([]);

  useEffect(() => {
    const fetchStationerWithRatings = async () => {
      if (!supabase) {
        console.error('Supabase client is not initialized');
        return;
      }

      // Fetch all stations
      const { data: stations, error: stationError } = await supabase
        .from('recycling_sites')
        .select('*');

      if (stationError) {
        console.error('Error fetching stationer:', stationError);
        return;
      }

      // Fetch reviews and calculate average stars for each site
      const { data: reviews, error: reviewError } = await supabase
        .from('reviews')
        .select('site_id, num_stars');

      if (reviewError) {
        console.error('Error fetching reviews:', reviewError);
        return;
      }

      // Create a map of site_id -> average stars
      const avgStarsMap = reviews.reduce((acc, review) => {
        if (!acc[review.site_id]) {
          acc[review.site_id] = { totalStars: 0, reviewCount: 0 };
        }
        acc[review.site_id].totalStars += review.num_stars;
        acc[review.site_id].reviewCount += 1;
        return acc;
      }, {});

      // Attach average star ratings to each station
      const stationsWithRatings = stations.map((station) => {
        const siteRating = avgStarsMap[station.id];
        const avgStars = siteRating
          ? (siteRating.totalStars / siteRating.reviewCount).toFixed(1)
          : 'No reviews';

        return {
          ...station,
          avg_stars: avgStars,
        };
      });

      setStationer(stationsWithRatings);
    };

    fetchStationerWithRatings();
  }, [supabase]);

  return (
    <>
   <div className='bg-gradient-to-b from-natur to-white'>
        <div className=" min-h-screen bg-gradient-to-b from-lightGreen to-white w-[1440px] mx-auto">
        <h1 className='text-center mb-20 pt-10 text-heading-1 '>Genbrugsstationer</h1>
            <div className='grid grid-cols-2 gap-6 place-items-center '>
                
                {stationer.map((station) => (
                <div className='border border-black shadow-xl' key={station.id}>
                    <Link to={`/genbrugsstationer/${station.id}`}>
                    <iframe
                        src={`https://maps.google.com/maps?q=${station.latitude},${station.longitude}&z=15&output=embed`}
                        width="500"
                        height="300"
                        allowFullScreen=""
                        loading="lazy"
                        title="station-map"
                    ></iframe>
                    <div className='space-y-4 p-4'>
                        <h2>{station.name}</h2>
                        <p>Stjerner: {station.avg_stars} / 5</p>
                    </div>
                        <p>{station.review}</p>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    </div>
    </>
  );
};
