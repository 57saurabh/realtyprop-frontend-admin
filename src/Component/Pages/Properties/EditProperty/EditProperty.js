// components/EditProperty.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProperty.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditProperty.css';
import Loader from '../../../utils/loader/Loader';


const EditProperty = () => {
  const params = useParams();
  const history = useNavigate();
  const [property, setProperty] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms:'',
    bathrooms:'',
    type:'',
    transactionType:'',
    description:'',
    features:'',
    squareFootage:'',
    images:[],
    

  });


  const [editableField, setEditableField] = useState(null); // Track the currently editable field
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://realtyprop-backend-production.up.railway.app/property/${params.id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            // 'Content-Type': 'multipart/form-data',
          },
        });
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
        
      } finally {
        // Set loading to false once the API call is complete
        setLoading(false);
      }
      
    };

    fetchProperty();
  }, [params.id]);

  const handleChange = (e) => {
    setProperty({ ...property, [editableField]: e.target.value });
  };

  const handleEdit = (field) => {
    setEditableField(field);
  };
  const handleImageChange = (e) => {
    // Handle image upload and update the property state
    const uploadedImages = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setProperty({ ...property, images: uploadedImages });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`https://realtyprop-backend-production.up.railway.app/property/${params.id}`, {
        [editableField]: property[editableField],
    },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            // 'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);

      // Reset editable field after successful update
      toast.success('Property updated successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
      });
      setEditableField(null);

    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      // Handle error and show a failure message
    }
  };

  const goBack = () => {
    history(-1); // Navigate back one step in the history
  };

  return (
    <div className='edit-property-container'>
      <h2>Edit Property</h2>
      {
        loading?<Loader/>:(
      <form onSubmit={handleSubmit}>
        <label>
          <b>Title:</b> {editableField === 'title' ? (
            <input type="text" name="title" value={property.title} onChange={handleChange} />
          ) : (
            <span onClick={() => handleEdit('title')}>{property.title}</span>
          )}
        </label>
        <label>
  <b>Type:</b>
  {editableField === 'type' ? (
    <select name="type" value={property.type} onChange={handleChange}>
      <option value="plot">plot</option>
      <option value="flat">flat</option>
      <option value="penthouse">Penthouse</option>
      {/* Add more options based on your specific types */}
    </select>
  ) : (
    <span onClick={() => handleEdit('type')}>{property.type}</span>
  )}
</label>

        <label>
  <b>Transaction Type:</b>
  {editableField === 'transactionType' ? (
    <select name="transactionType" value={property.transactionType} onChange={handleChange}>
      <option value="Rent">Rent</option>
      <option value="Buy">Buy</option>
      {/* Add other options if needed */}
    </select>
  ) : (
    <>
      <span onClick={() => handleEdit('transactionType')}>{property.transactionType}</span>
    </>
  )}
</label>

        
        <label>
          <b>Location:</b> {editableField === 'location' ? (
            <input type="text" name="location" value={property.location} onChange={handleChange} />
          ) : (
            <span onClick={() => handleEdit('location')}>{property.location}</span>
          )}
        </label>
        <label>
         <b> Price:</b> {editableField === 'price' ? (
            <input type="text" name="price" value={property.price} onChange={handleChange} />
          ) : (
            <span onClick={() => handleEdit('price')}>{property.price}</span>
          )}
        </label>
        <label><b>Bedrooms:</b>{editableField==='bedrooms'?(
          <input type="number" name="bedrooms" value={property.bedrooms} onChange={handleChange} />

        ):
        (
          <span onClick={() => handleEdit('bedrooms')}>{property.bedrooms}</span>
        )
          }
        </label>
        <label><b>Bathrooms:</b>{editableField==='bathrooms'?(
          <input type="number" name="bathrooms" value={property.bathrooms} onChange={handleChange} />

        ):
        (
          <span onClick={() => handleEdit('bathrooms')}>{property.bathrooms}</span>
        )
          }
        </label>
        <label>
          <b>Square Footage:</b>{editableField==='squareFootage'?(
          <input type="number" name="squareFootage" value={property.squareFootage} onChange={handleChange} />
          ):(<span onClick={()=>handleEdit('squareFootage')}>{property.squareFootage}</span>)
          }
        </label>
        <label><b>Description:</b>{editableField==='description'?(
          <input type="text" name="description" value={property.description} onChange={handleChange} />

        ):
        (
          <span onClick={() => handleEdit('description')}>{property.description}</span>
        )
          }
        </label>
        <label><b>Features:</b>{editableField==='features'?(
          <input type="text" name="features" value={property.features} onChange={handleChange} />

        ):
        (
          <span onClick={() => handleEdit('features')}>{property.features}</span>
        )
          }
        </label>
        <label>
          <b>Images:</b>{editableField === 'images' ? (
            <input type="file" name="images" onChange={handleImageChange} multiple />
          ) : (
            <div>
              {property.images.map((image, index) => (
                <img key={index} src={image} alt={`Property Image ${index}`} />
              ))}
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                multiple
              />
            </div>
          )}
        </label>
          
        


        
        {/* ... other property fields */}
        <button type="submit">Update Property</button>
              <div className="gobackbtn">
        <button   onClick={goBack}>Go Back</button>
              </div>
      </form>
        )
      }
      <ToastContainer />
    </div>
  );
};

export default EditProperty;
