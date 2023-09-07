import React from 'react'
import ReactDOM from 'react-dom/client'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Confirmation from "./components/Confirmation.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='confirmation' element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;