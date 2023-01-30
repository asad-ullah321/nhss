import './App.css';


import { Route, Routes } from 'react-router-dom';

import Stock from './components/stockmanagement/Stock';
import IssuedStock from './components/IssuedStock/IssuedStock';
import Fine from './components/Fine/Fine';
import Lib from './components/Library/Lib';
import { Attendance } from './components/Attendance/Attendance';
import Student from './components/manageStudents/Student';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Stock/>} />
        <Route exact path='/issuedStock' element={<IssuedStock/>}/>
        <Route exact path='/fine' element={<Fine/>}/>
        <Route exact path='/lib' element={<Lib/>} />
        <Route exact path='/attendance' element={<Attendance/>} />
        <Route exact path='/student' element={<Student/>} />


      </Routes>
      
    </div>
  );
}

export default App;
