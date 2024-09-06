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
            <div className='relative flex justify-center bg-gradient-to-b from-natur to-white mb-20 '>
                <div className=' w-[1580px] justify-center items-center bg-gradient-to-b from-lightGreen to-white p-4 space-y-4'>
                    <h1 className='text-heading-1 text-deepGreen'>{artiklerDetail.title}</h1>
                    <p className='text-heading-3 font-semibold text-forrestGreen'>{artiklerDetail.teaser}</p>
                    <p>{artiklerDetail.published_at}</p>
                    <img src={artiklerDetail.image_url} alt={artiklerDetail.title} />                   
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
