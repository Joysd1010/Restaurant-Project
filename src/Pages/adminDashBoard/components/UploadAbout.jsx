import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance'; 

const UploadAbout = () => {
  const [story, setStory] = useState('');
  const [chefProfiles, setChefProfiles] = useState([{ name: '', specialty: '', image: null }]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChefChange = (index, field, value) => {
    const updatedProfiles = [...chefProfiles];
    updatedProfiles[index][field] = value;
    setChefProfiles(updatedProfiles);
  };

  const handleChefFileChange = (index, e) => {
    const updatedProfiles = [...chefProfiles];
    updatedProfiles[index].image = e.target.files[0];
    setChefProfiles(updatedProfiles);
  };

  const addChefProfile = () => {
    setChefProfiles([...chefProfiles, { name: '', specialty: '', image: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!story || chefProfiles.some(chef => !chef.name || !chef.specialty || !chef.image)) {
      setError('All fields are required.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('story', story);

      chefProfiles.forEach((chef, index) => {
        formData.append(`chefProfiles`, chef.image); 
        formData.append(`chefProfiles[${index}][name]`, chef.name);
        formData.append(`chefProfiles[${index}][specialty]`, chef.specialty);
      });

      const response = await axiosInstance.post('/about', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setStory('');
        setChefProfiles([{ name: '', specialty: '', image: null }]);
      } else {
        setError('Failed to upload about information. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('An error occurred while uploading the about information.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full z-20 max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Upload About Information</h2>
        {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">About information uploaded successfully!</div>}
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Story of Employees</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olive focus:border-olive sm:text-sm"
              rows="4"
              required
            ></textarea>
          </div>
          {chefProfiles.map((chef, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                <input
                  type="text"
                  value={chef.name}
                  onChange={(e) => handleChefChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olive focus:border-olive sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Post</label>
                <input
                  type="text"
                  value={chef.specialty}
                  onChange={(e) => handleChefChange(index, 'specialty', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-olive focus:border-olive sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(e) => handleChefFileChange(index, e)}
                  className="mt-1 block w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                  required
                />
              </div>
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={addChefProfile}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Another Employee
            </button>
          </div>
          <div>
            <button
              type="submit"
              disabled={uploading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${uploading ? 'bg-gray-400' : 'bg-olive hover:bg-olive focus:ring-2 focus:ring-offset-2 focus:ring-olive'}`}
            >
              {uploading ? 'Uploading...' : 'Upload About Info'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadAbout;
