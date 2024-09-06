import React, { useEffect, useState } from 'react';
import { useSupabase } from '../providers/SupabaseProvider';
import { Link } from 'react-router-dom';

export const Sorteringsguide = () => {
    const [trashSections, setTrashSections] = useState([]);
    const { supabase } = useSupabase();

    useEffect(() => {
        const fetchTrashSections = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('trash_sections')
                .select('*'); 
            if (error) {
                console.log('Error fetching trash sections:', error);
                return;
            }

            setTrashSections(data); 
        };

        fetchTrashSections();
    }, [supabase]);

    return (
        <>
        
        <div className='bg-gradient-to-b from-natur to-white'>
        <div className="bg-gradient-to-b from-lightGreen to-white w-[1440px] mx-auto">
            <h1 className='text-heading-2 text-mossGreen font-semibold mb-4 pt-10 pl-24'>Sorteringsguide</h1>
            <p className='text-heading-4 text-forrestGreen mb-4 font-semibold pl-24'>Vælg en sektion</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 place-items-center">
            {/* Render Trash Sections */}
            {trashSections.length > 0 ? (
                trashSections.map((section) => (
                    <Link key={section.id} to={`/sorteringsguide/${section.id}`}>
                <div 
                    key={section.id} 
                    className="w-[518px] h-[181px]  rounded-md shadow-lg flex justify-between items-center" 
                    style={{ backgroundColor: `#${section.color}` }} // Ensure the # symbol is added
                >
                    {/* Text Content */}
                    <div className="flex-1 pr-4 p-4">
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    </div>

                    {/* Image Section */}
                    <div className="flex-shrink-0 w-[174px] h-[182px]">
                    <img 
                        src={section.image_url} 
                        alt={section.title} 
                        className="object-cover h-full w-full" 
                    />
                    </div>
                </div>
                </Link>
                ))
            ) : (
                <p>No trash sections available</p>
            )}
            </div>
        </div>
    </div>
    </>
    );
};
