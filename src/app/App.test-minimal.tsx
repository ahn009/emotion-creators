import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import '@/app/styles/globals.css';

export default function App() {
  console.log('App rendering...');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
