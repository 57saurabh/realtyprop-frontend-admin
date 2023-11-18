import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from '../Pages/Dashboard';
import Login from '../Auth/Login';
import AddProperty from '../Pages/Properties/AddProperty/AddProperty';
import PrivateRouting from './PrivateRouting';
import PublicRoutes from './PublicRoutes';
import EditProperty from '../Pages/Properties/EditProperty/EditProperty';
import Navbar from '../NavBar/Navbar';
import CustomerList from '../Pages/CoustmerList/CoustmerList';
import Queries from '../Pages/Queries/Queries';



function MainRouting() {
  return (
    <Router>
      
      <Routes>
          <Route path="/" element={
          <PrivateRouting>
            <Navbar/>
          <Dashboard />
          </PrivateRouting>
          } /> {/* Added route for Home */}
          <Route path='/properties/add' element={
          <PrivateRouting>
            <Navbar/>
          <AddProperty/>
          </PrivateRouting>
          } />
          <Route path='/properties/edit/:id' element={
          <PrivateRouting>
            <Navbar/>
          <EditProperty/>
          </PrivateRouting>
          } />
          <Route path='/coustmer' element={
          <PrivateRouting>
            <Navbar/> 
          <CustomerList/>
          </PrivateRouting>
          } />
          <Route path='/queries' element={
          <PrivateRouting>
            <Navbar/>
            <Queries/> 
          </PrivateRouting>
          } />
          <Route path='/login' element={
          <PublicRoutes>
          <Login/>
          </PublicRoutes>
          } />

        {/* <Route path="/login" element={<Login />} /> */}
          
      </Routes>

    </Router>
  );
}

export default MainRouting;
