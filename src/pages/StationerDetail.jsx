import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabase } from '../providers/SupabaseProvider';
import { Reviews } from '../components/Reviews'; // Import Reviews component

export const StationerDetail = () => {
    const { id } = useParams(); // Get station id from the URL
    const { supabase } = useSupabase(); // Supabase client
    const [stationerDetail, setStationerDetail] = useState(null); // Station data state
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchStationerDetail = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            // Fetch recycling station details from Supabase
            const { data, error } = await supabase
                .from('recycling_sites')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.log('Error fetching stationer detail:', error);
                return;
            }

            setStationerDetail(data); // Set the fetched data to state
            setLoading(false); // Stop loading when data is fetched
        };

        fetchStationerDetail();
    }, [supabase, id]);
    
    // Display a loading message if the data is still being fetched
    if (loading) return <p>Loading...</p>;

    // Handle if no station data is found
    if (!stationerDetail) return <p>No station details found.</p>;

    return (
        <div>
            <div>
                <iframe
                    src={`https://maps.google.com/maps?q=${stationerDetail.latitude},${stationerDetail.longitude}&z=15&output=embed`}
                    width="100%"
                    height="500"
                    allowFullScreen=""
                    loading="lazy"
                    title="station-map"
                ></iframe>
                <h1>{stationerDetail.name}</h1>
                <p>Telefon: {stationerDetail.phone || 'N/A'}</p>
                <p>Email: {stationerDetail.email || 'N/A'}</p>
                <p>Address: {stationerDetail.address}</p>
                <p>City: {stationerDetail.city}</p>          
                <p>Country: {stationerDetail.country}</p>
                <p>Kontakt: {stationerDetail.phone || 'N/A'}</p>
                <p>Antal Stjerner: {stationerDetail.avg_stars || 'N/A'} / 5</p>
            </div>
            {/* Include the Reviews component here */}
            <Reviews stationId={stationerDetail.id} />
        </div>
    );
};
