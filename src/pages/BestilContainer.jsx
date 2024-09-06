import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSupabase } from '../providers/SupabaseProvider';

export const BestilContainer = () => {
  const { supabase } = useSupabase();
  const [containerTypes, setContainerTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState(null); // Store selected container ID
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    const fetchContainerTypes = async () => {
      if (!supabase) {
        console.error('Supabase client is not initialized');
        return;
      }

      const { data, error } = await supabase.from('containers').select('*');

      if (error) {
        console.log('Error fetching container types:', error);
        return;
      }

      setContainerTypes(data);
      setLoading(false);
    };

    fetchContainerTypes();
  }, [supabase]);

  const onSubmit = async (formData) => {
    if (!supabase || !selectedContainer) {
      console.error('Supabase client is not initialized or no container selected');
      return;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          fullname: formData.name,
          address: formData.address,
          zipcode: formData.postalCode,
          city: formData.city,
          email: formData.email,
          phone: formData.phone,
          container_id: selectedContainer, // Send selected container ID
        }
      ]);

    if (error) {
      console.log('Error placing order:', error);
      return;
    }

    // Reset the form and redirect to the thank-you page
    reset();
    navigate('/thank-you');
  };

  const handleContainerClick = (containerId) => {
    setSelectedContainer(containerId);
  };

  if (loading) return <p>Loading container types...</p>;

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-b from-natur to-white h-screen mb-20'>
      <div className=" min-h-screen bg-gradient-to-b from-lightGreen to-white w-[1440px] mx-auto p-10">
      <h1 className='text-heading-1 font-semibold text-deepGreen mb-6 '>Bestil affaldscontainer</h1>
      <p className='text-body text-forrestGreen mb-6'>Hvis I mangler en affaldscontainer i din husstand kan du bestille en  ved at udfylde og sende formularen herunder.</p>

      <form className='w-full max-w-md p-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>

        <div className='mb-6'>
          <label className='block mb-2'>Vælg en container type:</label>
          <div className='flex space-x-4'>
            {containerTypes.map((type) => (
              <div
                key={type.id}
                className={`w-[128px] p-4 border rounded-md shadow-lg ${selectedContainer === type.id ? 'border-mossGreen bg-mossGreen ' : 'border-gray-300 hover:border-lightGreen hover:bg-lightGreen'} cursor-pointer`}
                onClick={() => handleContainerClick(type.id)}
              >
                <div dangerouslySetInnerHTML={{ __html: type.icon_svg }} />
                <p className='text-center'>{type.name}</p>
              </div>
            ))}
          </div>
          {selectedContainer === null && <p className='text-red-600 text-sm'>Please select a container type</p>}
          <p className='mt-10'>Containeren leveres til</p>
        </div>
          <label className='block mb-2' htmlFor='name'></label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Indtast dit navn'
            type='text'
            id='name'
            {...register('name', { required: 'Navn is required' })}
          />
          {errors.name && <p className='text-red-600 text-sm'>{errors.name.message}</p>}
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='address'></label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Indtast din adresse'
            type='text'
            id='address'
            {...register('address', { required: 'Adresse is required' })}
          />
          {errors.address && <p className='text-red-600 text-sm'>{errors.address.message}</p>}
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='postalCode'></label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Indtast din postnummer'
            type='text'
            id='postalCode'
            {...register('postalCode', { required: 'Postnummer is required' })}
          />
          {errors.postalCode && <p className='text-red-600 text-sm'>{errors.postalCode.message}</p>}
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='city'></label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Indtast navn på din by'
            type='text'
            id='city'
            {...register('city', { required: 'By is required' })}
          />
          {errors.city && <p className='text-red-600 text-sm'>{errors.city.message}</p>}
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='email'></label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Indtast din email'
            type='email'
            id='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
        </div>

        <div className='mb-4'>
          <label className='block mb-2' htmlFor='phone'></label>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Indtast din telefonnummer'
            type='tel'
            id='phone'
            {...register('phone', {
              required: 'Telefon is required',
              pattern: {
                value: /^[0-9]{8,15}$/,
                message: 'Invalid phone number',
              },
            })}
          />
          {errors.phone && <p className='text-red-600 text-sm'>{errors.phone.message}</p>}
        </div>

      

        <button
          className=' bg-deepGreen text-white py-2 px-8 rounded hover:bg-forrestGreen'
          type='submit'
        >
          Send
        </button>
      </form>
      </div>  
    </div>
    
  );
};
