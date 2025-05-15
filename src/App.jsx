import React from 'react';
//--------------------------------

import HomePageLayout from './components/HomePageLayout'

function App() {
  return (
    <div className="App">
      <HomePageLayout />
    </div>
  );
}

//----------------------------
// si quiero correr la pagina principal (homepage) quitar comentario de esta linea hacia arriba y comentar lo de abajo
//----------------------------
/*
import Login from './components/Login';

function App() {
  return <Login />;
}
*/
//----------------------------
export default App;