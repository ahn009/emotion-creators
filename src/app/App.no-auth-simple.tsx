import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/app/styles/globals.css';

// Simple test pages
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-4">✅ EmotionCreator</h1>
        <p className="text-2xl mb-8">App is working! (No Auth Mode)</p>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Status:</h2>
          <ul className="space-y-2">
            <li>✓ React rendering</li>
            <li>✓ Router working</li>
            <li>✓ Styles loading</li>
            <li>✓ No white screen!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function CreatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold">Create Page (No Auth)</h1>
      <p>This would be the create page</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="*" element={<div className="p-8">404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
