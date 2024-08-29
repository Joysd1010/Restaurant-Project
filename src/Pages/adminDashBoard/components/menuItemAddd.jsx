import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';

const MenuItemAdding = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [price, setPrice] = useState('');
  const [offer, setOffer] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [type, setType] = useState('');
  const [promotionalLine, setPromotionalLine] = useState('');
  const [available, setAvailable] = useState(true);
  const [allergy, setAllergy] = useState(true);
  const [callories, setCallories] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/menu/category');
        if (response.status === 200) {
          setCategories(response.data);
        } else {
          setError('Failed to fetch categories.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('An error occurred while fetching categories.');
      }
    };

    fetchCategories();
  }, []);
console.log(ingredients)
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image || !details || !price || !type || !category) {
      setError('Please fill in all required fields.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('name', name);
      formData.append('details', details);
      formData.append('ingredients', ingredients);
      formData.append('price', price);
      formData.append('offer', offer);
      formData.append('offerPrice', offerPrice);
      formData.append('type', type);
      formData.append('promotionalLine', promotionalLine);
      formData.append('available', available);
      formData.append('allergy', allergy);
      formData.append('callories', callories);
      formData.append('category', category);

      const response = await axiosInstance.post('/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setName('');
        setImage(null);
        setDetails('');
        setIngredients(['']);
        setPrice('');
        setOffer(false);
        setOfferPrice('');
        setType('');
        setPromotionalLine('');
        setAvailable(true);
        setCategory('');
      } else {
        setError('Failed to add menu item. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('An error occurred while adding the menu item.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Menu Item</h2>
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">Menu item added successfully!</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-md cursor-pointer focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(event) => handleIngredientChange(index, event)}
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddIngredient}
              className="text-green-500 hover:text-green-700 mt-2"
            >
              Add Ingredient
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Offer</label>
            <input
              type="checkbox"
              checked={offer}
              onChange={(e) => setOffer(e.target.checked)}
              className="mt-1"
            />
          </div>
          {offer && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Offer Price</label>
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <div className="mt-1 flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="breakfast"
                  checked={type === 'breakfast'}
                  onChange={() => setType('breakfast')}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Breakfast</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="lunch"
                  checked={type === 'lunch'}
                  onChange={() => setType('lunch')}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Lunch</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="dinner"
                  checked={type === 'dinner'}
                  onChange={() => setType('dinner')}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Dinner</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Promotional Line</label>
            <input
              type="text"
              value={promotionalLine}
              onChange={(e) => setPromotionalLine(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Available</label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Allergy</label>
            <input
              type="checkbox"
              checked={allergy}
              onChange={(e) => setAllergy(e.target.checked)}
              className="mt-1"
            />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">Callories</label>
              <input
                type="number"
                value={callories}
                onChange={(e) => setCallories(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={uploading}
              className={`w-full px-4 py-2 text-white bg-green-600 hover:bg-darkOlive rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? 'Uploading...' : 'Add Menu Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemAdding;
