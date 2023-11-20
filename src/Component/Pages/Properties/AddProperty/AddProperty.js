// components/Add js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddProperty.css'; // Import your CSS file

const AddProperty = () => {
  
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [squareFootage, setSquareFootage] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType,setTransactionType] =useState('')
    const [features, setFeatures] = useState([]);
    const [loading,setLoading] =useState(false)
    const [images, setImages] = useState(null);
  
    const handleFileChange = (e) => {
      setImages(e.target.files);
      console.log(e.target.files);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('transactionType', transactionType);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('bedrooms', bedrooms);
      formData.append('bathrooms', bathrooms);
      formData.append('squareFootage', squareFootage);
      formData.append('description', description);
      formData.append('features', features);
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
    try {
      // Send a POST request to the server to add the property
      setLoading(true);
      
      const response = await axios.post(
        "https://realtyprop-backend-production.up.railway.app/property",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            // 'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      toast.success('Property submitted successfully!');
      // Redirect or show a success message
    } catch (error) {
      console.error('Error submitting property:', error);
      toast.error(`${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="add-property">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Property Information */}
        <label>Title:
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>Type:
          <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select...</option>
            <option value="plot">Plot</option>
            <option value="flat">Flat</option>
            <option value="penthouse">Penthouse</option>
            {/* Add more options as needed */}
          </select>
      </label>
      <label>Transaction Type:
  <select name="transactionType" onChange={(e) => setTransactionType(e.target.value)}>
    <option value="">Select...</option>
    <option value="buy">Buy</option>
    <option value="rent">Rent</option>
  </select>
</label>


        <label>Location:
          <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>Price:
          <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
         <label>Bedrooms:
          <input type="number" name="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
        </label>
        <label>Bathrooms:
          <input type="number" name="bathrooms" value={ bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
        </label>
        <label>Sqr.mt:
          <input type="text" name="squareFootage" value={ squareFootage} onChange={(e) => setSquareFootage(e.target.value)} />
        </label>
        <label>Description:
          <textarea name="description" value={ description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label>Features:
          <input type="text" name="features" value={ features} onChange={(e) => setFeatures(e.target.value)} />
        </label>

         <label>Images:
         <input type="file" name="images" onChange={handleFileChange} multiple />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding  ...' : 'Add Property'}
        </button>
      <ToastContainer />
      </form>
    </div>
  );
};

export default AddProperty;
