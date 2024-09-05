import React, { useEffect, useState } from 'react'
import { useSupabase } from '../providers/SupabaseProvider'
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
        <div className=' w-[1580px] px-10 bg-gradient-to-b from-lightGreen to-white '>
            {articles.map((article) => (     
                <div key={article.id}>
                    <Link
                            to={`/artikler/${article.id}`} // Route to the detail view
                        >
                    <h2 className='text-heading-2'>{article.title}</h2>
                    <p className='text-body'>{article.teaser}</p>
                    <img 
                        className='w- h-[300px] object-cover'
                        src={article.image_url}
                        alt={article.title} 
                        />
                        
                           
                        </Link>
                </div>
            ))}
        </div>
    </div>
  )
}
