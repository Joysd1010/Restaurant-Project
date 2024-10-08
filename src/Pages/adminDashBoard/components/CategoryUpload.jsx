import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance'; // Make sure this is correctly configured

const CategoryUpload = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [promoLine, setPromoLine] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log('Selected file:', e.target.files[0]); // Verify file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !promoLine || !file) {
      setError('All fields are required.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file); // Ensure file is appended
      formData.append('name', name);
      formData.append('category', category);
      formData.append('promoLine', promoLine);

      
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`); // Verify FormData entries
      }

      const response = await axiosInstance.post('/menu/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setSuccess(true);
        setName('');
        setCategory('');
        setPromoLine('');
        setFile(null);
      } else {
        setError('Failed to upload category. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error); // Log the error for debugging
      setError('An error occurred while uploading the category.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4  ">
     
      <div className="w-full z-20 max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create New Category</h2>
        {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">Category created successfully!</div>}
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olive focus:border-olive sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olive focus:border-olive sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Promo Line</label>
            <textarea
              value={promoLine}
              onChange={(e) => setPromoLine(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olive focus:border-olive sm:text-sm"
              rows="4"
              required
            ></textarea>
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
            <button
              type="submit"
              disabled={uploading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${uploading ? 'bg-gray-400' : 'bg-olive hover:bg-olive focus:ring-2 focus:ring-offset-2 focus:ring-olive'}`}
            >
              {uploading ? 'Uploading...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryUpload;
