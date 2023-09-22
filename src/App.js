import React from 'react';
import GradeCalculator from './GradeCalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <GradeCalculator schoolYear = "1학년"/>
      <GradeCalculator schoolYear = "2학년"/>
      <GradeCalculator schoolYear = "3학년"/>
    </div>
  );
}

export default App;
