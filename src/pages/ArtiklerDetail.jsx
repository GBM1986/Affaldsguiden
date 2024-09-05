import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSupabase } from '../providers/SupabaseProvider';

export const ArtiklerDetail = () => {

    const { id } = useParams();
    const { supabase } = useSupabase();
    const [artiklerDetail, setArtiklerDetail] = useState(null);

    useEffect(() => {
        const fetchArtiklerDetail = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.log('Error fetching artikler detail:', error);
                return;
            }

            setArtiklerDetail(data);
        };

        fetchArtiklerDetail();
    }, [supabase, id]);


  return (
    <div>
        {artiklerDetail && (
            <div className='relative flex justify-center bg-gradient-to-b from-natur to-white mb-20'>
                <div className=' w-[1580px] justify-center items-center bg-gradient-to-b from-lightGreen to-white'>
                    <h1 className='text-heading-1'>{artiklerDetail.title}</h1>
                    <p className='text-body'>{artiklerDetail.teaser}</p>
                    <img src={artiklerDetail.image_url} alt={artiklerDetail.title} />
                    <p>{artiklerDetail.published_at}</p>
                    <div
                    className='text' // Apply your styles here
                    dangerouslySetInnerHTML={{ __html: artiklerDetail.html_content }}
                />
                </div>
            </div>
        )}
    </div>
  )
}
