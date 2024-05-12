import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import './Coustmer.css';
import Loader from '../../utils/loader/Loader';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [temp,setTemp] = useState()

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://realtyprop-backend-production-d2c6.up.railway.app/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleExportCSV = () => {
    try {
      const selectedFields = customers.map(customer => ({
        name: customer.name,
        role: customer.role,
        email: customer.email,
        phoneNo: customer.phoneNo,
      }));
  
      const csv = Papa.unparse(selectedFields, { header: true });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
  
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'customer_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error exporting as CSV:', error);
    }
  };
  

  return (
    <div className="customerList-container">
      <h2>Filtered and Sorted Customer List</h2>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <button className="export-button" onClick={handleExportCSV}>
  Export as CSV
</button>
          <table border={2}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone No</th>
              </tr>
            </thead>
            <tbody>
              {customers.filter(customer => customer.role === 'user').map(customer => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.role}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phoneNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
