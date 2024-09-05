import React, { useState, useEffect } from 'react';
import { useSupabase } from '../providers/SupabaseProvider';
import { useForm } from 'react-hook-form';

export const Reviews = ({ stationId }) => {
    const { supabase } = useSupabase();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);
    const [user, setUser] = useState(null);

    const {
        register: registerNewReview,
        handleSubmit: handleSubmitNewReview,
        reset: resetNewReview,
        setValue: setValueNewReview
    } = useForm({
        defaultValues: {
            subject: '',
            comment: '',
            num_stars: 1
        }
    });

    const {
        register: registerEditReview,
        handleSubmit: handleSubmitEditReview,
        reset: resetEditReview,
        setValue: setValueEditReview
    } = useForm({
        defaultValues: {
            subject: '',
            comment: '',
            num_stars: 1
        }
    });

    useEffect(() => {
        const fetchReviews = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('site_id', stationId)
                .eq('is_active', true);

            if (error) {
                console.error('Error fetching reviews:', error);
            } else {
                setReviews(data);
            }

            setLoading(false);
        };

        const fetchUser = async () => {
            if (!supabase) {
                console.error('Supabase client is not initialized');
                return;
            }

            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error);
            } else {
                setUser(user);
            }
        };

        fetchReviews();
        fetchUser();
    }, [supabase, stationId]);

    const onAddReview = async (formData) => {
        if (!supabase || !user) {
            console.error('Supabase client is not initialized or user is not authenticated');
            return;
        }

        const { data, error } = await supabase
            .from('reviews')
            .insert([
                { 
                    subject: formData.subject,
                    comment: formData.comment,
                    num_stars: formData.num_stars,
                    site_id: stationId,
                    user_id: user.id, // Use user.id to get the authenticated user's ID
                    is_active: true
                }
            ]);

        if (error) {
            console.error('Error adding review:', error);
        } else {
            setReviews([...reviews, ...data]);
            resetNewReview();
        }
    };

    const onEditReview = async (formData) => {
        if (!supabase || !editingReview) {
            console.error('Supabase client is not initialized or editingReview is not set');
            return;
        }

        const { data, error } = await supabase
            .from('reviews')
            .update({
                subject: formData.subject,
                comment: formData.comment,
                num_stars: formData.num_stars
            })
            .eq('id', editingReview.id);

        if (error) {
            console.error('Error editing review:', error);
        } else {
            setReviews(reviews.map(review => 
                review.id === editingReview.id ? { ...review, ...formData } : review
            ));
            setEditingReview(null);
            resetEditReview();
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!supabase) {
            console.error('Supabase client is not initialized');
            return;
        }

        const { error } = await supabase
            .from('reviews')
            .update({ is_active: false })
            .eq('id', reviewId);

        if (error) {
            console.error('Error deleting review:', error);
        } else {
            setReviews(reviews.filter(review => review.id !== reviewId));
        }
    };

    if (loading) return <p className="text-center text-xl font-semibold">Loading reviews...</p>;

    return (
        <div className="p-4 bg-lightGreen rounded-md shadow-md">
            <h2 className="text-heading-2 font-bold mb-4">Reviews</h2>
            {user && (
                <div className="mb-6 p-4 border border-gray-300 rounded-md">
                    <h3 className="text-heading-3 font-semibold mb-2">Add a Review</h3>
                    <form onSubmit={handleSubmitNewReview(onAddReview)} className="space-y-4">
                        <input
                            {...registerNewReview('subject')}
                            placeholder="Subject"
                            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            {...registerNewReview('comment')}
                            placeholder="Comment"
                            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            min="1"
                            max="5"
                            {...registerNewReview('num_stars')}
                            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button 
                            type="submit"
                            className="bg-forrestGreen text-white px-4 py-2 rounded-md hover:bg-deepGreen"
                        >
                            Add Review
                        </button>
                    </form>
                </div>
            )}
            
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id} className="p-4 mb-4 bg-white border border-gray-200 rounded-md shadow-sm">
                        <p><strong>Subject:</strong> {review.subject}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                        <p><strong>Rating:</strong> {review.num_stars} / 5</p>
                        <p><strong>By:</strong> {review.user_id}</p>
                        <p><strong>Date:</strong> {new Date(review.created_at).toLocaleDateString()}</p>
                        {user && (
                            <div className="mt-4 flex space-x-4">
                                <button 
                                    onClick={() => {
                                        setEditingReview(review);
                                        setValueEditReview('subject', review.subject);
                                        setValueEditReview('comment', review.comment);
                                        setValueEditReview('num_stars', review.num_stars);
                                    }}
                                    className="bg-smatBraendbart text-white px-4 py-2 rounded-md hover:bg-darkGrey"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteReview(review.id)}
                                    className="bg-textil text-white px-4 py-2 rounded-md hover:bg-darkGrey"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center text-xl">No reviews available.</p>
            )}

            {editingReview && (
                <div className="mt-6 p-4 border border-gray-300 rounded-md bg-lightGreen">
                    <h3 className="text-heading-3 font-semibold mb-2">Edit Review</h3>
                    <form onSubmit={handleSubmitEditReview(onEditReview)} className="space-y-4">
                        <input
                            {...registerEditReview('subject')}
                            placeholder="Subject"
                            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            {...registerEditReview('comment')}
                            placeholder="Comment"
                            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            min="1"
                            max="5"
                            {...registerEditReview('num_stars')}
                            className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <div className="flex space-x-4">
                            <button 
                                type="submit"
                                className="bg-forrestGreen text-white px-4 py-2 rounded-md hover:bg-deepGreen"
                            >
                                Save Changes
                            </button>
                            <button 
                                type="button"
                                onClick={() => setEditingReview(null)}
                                className="bg-darkGrey text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
