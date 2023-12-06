import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
 import './Queries.css'
import Loader from '../../utils/loader/Loader';

const QueryWindow = () => {
  const [userType, setUserType] = useState('buyer');
  const [queries, setQueries] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://realtyprop-backend.vercel.app/queries', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setQueries(response.data);
      } catch (error) {
        console.error('Failed to fetch queries:', error);
      } finally{
        setLoading(false)
      }
    };

    fetchQueries();
  }, []);

  const activeQueries = queries.filter(query => !query.resolved);
  const resolvedQueries = queries.filter(query => query.resolved);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleQueryResolved = async (id) => {
    try {
      // Update the query's resolved status in the backend
      await axios.patch(`https://realtyprop-backend.vercel.app/queries/${id}`, { resolved: true }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update the local state to reflect the change
      const updatedQueries = queries.map(query => {
        if (query._id === id) {
          return { ...query, resolved: true };
        }
        return query;
      });
      setQueries(updatedQueries);
    } catch (error) {
      console.error('Error marking query as resolved:', error);
    }
  };



  return (
    <div className='queries-container-big'>
      <select value={userType} onChange={handleUserTypeChange}>
        <option value="seller">Seller</option>
        <option value="buyer">buyer</option>
      </select>

      <Tabs>
        <TabList>
          <Tab>Active Queries</Tab>
          <Tab>Resolved Queries</Tab>
        </TabList>

          {
            loading? <Loader/>:(
          
        <TabPanel>
          {activeQueries.filter(query => query.userType === userType).map(query => (
            <div key={query.id}>
              <div key={query._id} className="quries-card">
             <h3>Name: {query.name}</h3>
             <h3>phone: {query.phoneNo}</h3>
             <p><strong>Email:</strong> {query.qemail}</p>
             <p><strong>Message:</strong> {query.message}</p>
             <p><strong>Date:</strong> {new Date(query.date).toLocaleDateString()}</p>
             {!query.resolved && (
               <button onClick={() => handleQueryResolved(query._id)}>Mark as Resolved</button>
               )}
           </div>
            </div>
          ))}
        </TabPanel>

        )} 

{
            loading? <Loader/>:(

        <TabPanel>
          {resolvedQueries.filter(query => query.userType === userType).map(query => (
            <div key={query.id}>
              <div key={query._id} className="quries-card">
             <h3>Name: {query.name}</h3>
             <p><strong>phone:</strong> {query.phoneNo}</p>
             <p><strong>Email:</strong> {query.qemail}</p>
             <p><strong>Message:</strong> {query.message}</p>
             <p><strong>Date:</strong> {new Date(query.date).toLocaleDateString()}</p>
           </div>
            </div>
          ))}
        </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default QueryWindow;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Queries.css'

// const Queries = () => {
//   const [queries, setQueries] = useState();

//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         const response = await axios.get('https://realtyprop-backend.vercel.app/queries',{
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             // 'Content-Type': 'multipart/form-data',
//           },
//         });
//         setQueries(response.data);
//       } catch (error) {
//         console.error('Error fetching queries:', error);
//       }
//     };

//     fetchQueries();
//   }, []);


//   const handleQueryResolved = async (id) => {
//     try {
//       // Update the query's resolved status in the backend
//       await axios.patch(`https://realtyprop-backend.vercel.app/queries/${id}`, { resolved: true }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       // Update the local state to reflect the change
//       const updatedQueries = queries.map(query => {
//         if (query._id === id) {
//           return { ...query, resolved: true };
//         }
//         return query;
//       });
//       setQueries(updatedQueries);
//     } catch (error) {
//       console.error('Error marking query as resolved:', error);
//     }
//   };

//   return (
//     <div className="quries-card-container">
//       <h2>Queries</h2>
//       <div className="quries-card-list">
//         {queries?.map(query => (
//           <div key={query._id} className="quries-card">
//             <h3>Name: {query.name}</h3>
//             <p><strong>Email:</strong> {query.email}</p>
//             <p><strong>Message:</strong> {query.message}</p>
//             <p><strong>Date:</strong> {new Date(query.date).toLocaleDateString()}</p>
//             {!query.resolved && (
//               <button onClick={() => handleQueryResolved(query._id)}>Mark as Resolved</button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Queries;


