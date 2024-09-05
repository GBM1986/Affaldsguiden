import React, { useEffect, useState } from 'react';
import PaintBucket from '../assets/images/malerspande.jpg';
import './styles.css'; 
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useSupabase } from '../providers/SupabaseProvider';
import tipsogtricksimg from '../assets/images/affaldssortering-1.jpg'
export const Home = () => {
    const [articles, setArticles] = useState([]);
    const [bannerArticle, setBannerArticle] = useState(null); 
    const [tipsAndTricks, setTipsAndTricks] = useState(null);
    const { supabase } = useSupabase();

    useEffect(() => {
        const fetchArticles = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .limit(2); // Limit the results to 2 articles

            if (error) {
                console.log('Error fetching articles:', error);
                return;
            }
            setArticles(data);
        };

        const fetchBannerArticle = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('slug', 'dit_affald_goer_en_forskel')
                .single(); 

            if (error) {
                console.log('Error fetching banner article:', error);
                return;
            }
            setBannerArticle(data);
        };

        const fetchTipsAndTricks = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('slug', 'tips_og_tricks')
                .single();

            if (error) {
                console.log('Error fetching tips and tricks:', error);
                return;
            }
            console.log("Fetched Tips & Tricks:", data);  // Log the fetched data
            setTipsAndTricks(data);

        }


        fetchArticles();
        fetchBannerArticle();
        fetchTipsAndTricks();
    }, [supabase]);

    return (
        <div className="relative flex flex-col items-center min-h-screen pb-20"> {/* Added min-h-screen and pb-20 */}
            {/* Outer Gradient Background */}
            <div className="absolute inset-0 h-[734px] z-0 bg-gradient-to-b from-[#06682D] to-[#FFFFFF]"></div>

            {/* Container for Image with Mask */}
            <div className="relative w-[1206px] h-[588px] z-10">
                <div className="relative w-full h-full fade-mask">
                    <img
                        src={PaintBucket}
                        alt="Hero Buckets"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#D8EADB] to-[#FFFFFF] opacity-[0.01]"></div>
            </div>

            {/* Container for NewsBoxes */}
            <div className="relative flex flex-col lg:flex-row gap-20 px-32 mt-[-200px] z-30 w-full max-w-screen-xl">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div 
                            key={article.id}
                            className="w-full md:w-[454px] h-[282px] bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-4">
                                <h2 className="text-heading-2 font-semibold">{article.title}</h2>
                                <p className="text-body">{article.teaser}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <FaArrowAltCircleRight className="text-deepGreen text-6xl rounded-full hover:text-forrestGreen cursor-pointer" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No articles available</p>
                )}
            </div>

            {bannerArticle && (
                <div className="w-full bg-lightGreen text-white mt-20 z-40 relative flex justify-center">
                    <div className="max-w-screen-xl mx-auto  flex flex-col lg:flex-row  items-center w-[1440px] gap-8 ">
                        {/* Text Section */}
                        <div className="flex-1">
                            <h1 className="text-heading-1 font-bold mb-4">{bannerArticle.title}</h1>
                            <p className="text-lg">{bannerArticle.teaser}</p>
                            <div className="mt-4">
                                <FaArrowAltCircleRight className="text-deepGreen text-6xl rounded-full hover:text-forrestGreen cursor-pointer" />
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex-shrink-0">
                            <img
                                src={bannerArticle.image_url}
                                alt={bannerArticle.title}
                                className="w-[451px] h-[395px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}

             {/* Tips & Tricks Section */}
             {tipsAndTricks && (
    <div className="bg-white w-full max-w-screen-lg shadow-lg rounded-lg flex flex-col lg:flex-row items-center mx-auto mt-20 z-40">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-[477px] h-[300px] lg:h-[572px]">
            <img
                src={tipsogtricksimg} // Assuming your data contains an image URL
                alt="Tips and Tricks"
                className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
            />
        </div>

        {/* Text Section */}
        <div className="flex flex-col p-6 space-y-8 lg:space-y-28 w-full">
            {/* First Line of Text */}
            <p className="text-xl lg:text-2xl font-medium text-forrestGreen">
                {tipsAndTricks.teaser} {/* Fetch teaser text from tips and tricks data */}
            </p>
            {/* Second Line of Text */}
            <p className="text-2xl lg:text-4xl font-semibold text-black">
                Tips og tricks til at
                <br /> <span className='text-forrestGreen'>sortere dit affald</span>
            </p>

            {/* Arrow Icon */}
            <div className="mt-4">
                <FaArrowAltCircleRight className="text-deepGreen text-4xl lg:text-6xl rounded-full hover:text-forrestGreen cursor-pointer" />
            </div>
        </div>
    </div>
)}
        </div>
    );
};
