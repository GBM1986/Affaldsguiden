import React, { useEffect, useState } from 'react';
import { useSupabase } from '../providers/SupabaseProvider';
import { Link } from 'react-router-dom';

export const Artikler = () => {
    const { supabase } = useSupabase();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('articles')
                .select('*');

            if (error) {
                console.log('Error fetching articles:', error);
                return;
            }

            setArticles(data);
        };

        fetchArticles();
    }, [supabase]);

    return (
        <div className='relative flex justify-center bg-gradient-to-b from-natur to-white mb-24'>
            <div className='w-[1580px] px-10 bg-gradient-to-b from-lightGreen to-white'>
                <h1 className="text-heading-1 text-center mb-10 pt-10">Artikler</h1>
                {articles.map((article) => (
                    <div key={article.id} className="flex items-center mb-8 border border-gray-200 rounded-lg">
                        <Link to={`/artikler/${article.id}`} className="flex items-center w-full gap-4">
                            <img
                                className='w-[300px] h-[200px] object-cover'
                                src={article.image_url}
                                alt={article.title}
                            />
                            <div>
                                <h2 className='text-heading-2 mb-2'>{article.title}</h2>
                                <p className='text-body'>{article.teaser}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
