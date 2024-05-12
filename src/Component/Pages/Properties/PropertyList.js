// components/PropertyList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PropertyList.css'; // Import your CSS file
import Loader from '../../utils/loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineRefresh } from 'react-icons/hi';




const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch properties from the server
        const response = await axios.get('https://realtyprop-backend-production-d2c6.up.railway.app/property');
        const sortedProperties = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setProperties(sortedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        // Set loading to false once the API call is complete
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Delete property from the server
      await axios.delete(`https://realtyprop-backend-production-d2c6.up.railway.app/property/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // 'Content-Type': 'multipart/form-data',
        },
      }
      );
      // Update the properties list after successful deletion
      setProperties(properties.filter(property => property._id !== id));
      // Display a success toast
      toast.success('Property deleted successfully! Refresh the page');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Error deleting property. Please try again.');
    }
  };

  const handleRefresh = () => {
    // Reload the page
    window.location.reload();
  };

  const handleFeaturedChange = async (id) => {
    try {
      // Send a PUT request to the server to update the property
      const property = properties.find(property => property._id === id);
      await axios.patch(`https://realtyprop-backend-production-d2c6.up.railway.app/property/${id}`, {
        featured: !property.featured,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update the properties list after successful update
      setProperties(properties.map(property => property._id === id ? { ...property, featured: !property.featured } : property));
      toast.success('Property featured status updated successfully!');
    } catch (error) {
      console.error('Error updating property featured status:', error);
      toast.error('Error updating property featured status. Please try again.');
    }
  };
  
  


  return (
    <div className="property-list">
      <h2>Property List</h2>
      <div className="addbtn">
        <Link to="/properties/add">Add Property</Link>
      </div>
           <div className="refresh-button" onClick={handleRefresh}>
        <HiOutlineRefresh />
      </div>
      {loading ? (
        <Loader/>
      ) : (
        <div className="property-container">
          {properties.map(property => (
            <div className="property-card" key={property.id}>
              <div className="property-card-img">
                <img src={property.thumbnail} alt="property" />
              </div>
              <h3>{property.title}</h3>
              <p>Location: {property.location}</p>
              <p>Type:{property.type} </p>
              <p>Price: {property.price}</p>
              <div className="actions">
                <Link to={`/properties/edit/${property._id}`}>Edit</Link>
                <button onClick={() => handleDelete(property._id)}>Delete</button>
                  <div className='featurebtn'
                  style={{
                    display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  flexDirection:'column',
                  }}>

                    <label >featured:</label>
                <label className="switch">
                <input type="checkbox" checked={property.featured} onChange={() => handleFeaturedChange(property._id)} />
                <span className="slider round"></span>
              </label>
                  </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
