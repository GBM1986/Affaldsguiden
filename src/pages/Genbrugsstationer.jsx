import React, { useEffect, useState } from 'react'
import { useSupabase } from '../providers/SupabaseProvider'
import { Link } from 'react-router-dom';

export const Genbrugsstationer = () => {

    const { supabase } = useSupabase();
    const [stationer, setStationer] = useState([]);

    useEffect(() => { 
        const fetchStationer = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('recycling_sites')
                .select('*');

            if (error) {
                console.log('Error fetching stationer:', error);
                return;
            }

            setStationer(data);
        }

        fetchStationer();
    }, [supabase]);

  return (
    <div>
        <h1>Genbrugsstationer</h1>
        {stationer.map((station) => (
            <div key={station.id}>
                <h2>{station.name}</h2>
                <p>{station.description}</p>
                <p>Stjerner: {station.avg_stars} / 5</p>
                <Link to={`/genbrugsstationer/${station.id}`}>Se mere</Link>
            </div>
        ))}     
    </div>
  )
}
