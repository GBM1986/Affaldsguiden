import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabase } from '../providers/SupabaseProvider';
import { TfiArrowCircleDown } from 'react-icons/tfi'; // Import the new down arrow icon

export const Section = () => {
  const { id } = useParams(); // Get the section ID from the route
  const [section, setSection] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState({});
  const [typeDetails, setTypeDetails] = useState({});
  const [visibleCategories, setVisibleCategories] = useState({}); // State to manage visibility of categories
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchSectionAndCategories = async () => {
      try {
        // Fetch section details
        const { data: sectionData, error: sectionError } = await supabase
          .from('trash_sections')
          .select('*')
          .eq('id', id)
          .single();

        if (sectionError) throw sectionError;
        setSection(sectionData);

        // Fetch categories for the section
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('trash_categories')
          .select('*')
          .eq('section_id', id);

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData);

        // Fetch category types for the categories
        const { data: categoryTypesData, error: categoryTypesError } = await supabase
          .from('trash_category_type_rel')
          .select('category_id, type_id, is_allowed')
          .in('category_id', categoriesData.map(cat => cat.id));

        if (categoryTypesError) throw categoryTypesError;

        // Fetch type details
        const typeIds = categoryTypesData.map(({ type_id }) => type_id);
        const { data: typeDetailsData, error: typeDetailsError } = await supabase
          .from('trash_types')
          .select('*')
          .in('id', typeIds);

        if (typeDetailsError) throw typeDetailsError;

        // Organize types by category
        const organizedTypes = {};
        categoryTypesData.forEach(({ category_id, type_id, is_allowed }) => {
          if (!organizedTypes[category_id]) {
            organizedTypes[category_id] = { allowed: [], notAllowed: [] };
          }
          organizedTypes[category_id][is_allowed ? 'allowed' : 'notAllowed'].push(type_id);
        });
        setCategoryTypes(organizedTypes);

        // Organize type details by type_id
        const typeDetailsMap = {};
        typeDetailsData.forEach(type => {
          typeDetailsMap[type.id] = type;
        });
        setTypeDetails(typeDetailsMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSectionAndCategories();
  }, [id, supabase]);

  // Toggle visibility of categories
  const toggleCategoryVisibility = (categoryId) => {
    setVisibleCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="min-h-screen z-50" style={{ backgroundColor: section ? `#${section.color}` : '#fff' }}>
      <div className="p-8">
        {section && <h1 className="text-4xl font-bold mb-4 text-white">{section.title}</h1>}
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="mb-4 p-4 bg-white rounded-lg shadow-lg relative">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <img
                  src={category.image_url}
                  alt={category.title}
                  className="w-24 h-24 object-cover rounded-lg"
                ></img>
                <button
                  onClick={() => toggleCategoryVisibility(category.id)}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-500"
                  style={{ marginBottom: '-12px' }} // Adjust this margin as needed
                >
                  <TfiArrowCircleDown
                    className={`transition-transform ${visibleCategories[category.id] ? 'rotate-180' : 'rotate-0'}`}
                    size={24} // Adjust size as needed
                  />
                </button>
              </div>
              {visibleCategories[category.id] && (
                <div className="flex justify-evenly mt-4">
                  <h3 className="text-xl font-semibold">Ja tak:</h3>
                  <ul className="list-disc pl-5">
                    {categoryTypes[category.id]?.allowed.map(typeId => (
                      <li key={typeId}>{typeDetails[typeId]?.title || `Type ${typeId}`}</li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-semibold">Nej tak:</h3>
                  <ul className="list-disc pl-5">
                    {categoryTypes[category.id]?.notAllowed.map(typeId => (
                      <li key={typeId}>{typeDetails[typeId]?.title || `Type ${typeId}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};
