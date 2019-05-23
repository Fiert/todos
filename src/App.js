import React from 'react';
import './App.css';
import Todo from '../src/components/Todo/Todo';

const App = () => {
  return (
    <div className={'container'}>
      <div className={'title'}> TO-DO List</div>
      <Todo/>
    </div>
  );
};

export default App;
