import { Suspense, } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { LanguageProvider } from './components/hooks/LanguageContext';

// Eager load critical components
import Hero from './components/features/Hero';
import Education from './components/features/Education';
import Experience from './components/features/Experience';
import Certificates from './components/features/Certificates';
import Contact from './components/features/Contact';
import Projects from './components/features/Projects';

// Loading component with improved design
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center">
      <div className="animate-pulse flex space-x-3">
        <div className="w-2.5 h-2.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-2.5 h-2.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2.5 h-2.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Loading page...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <div className='min-h-[85vh]'>
              <Routes>

                {/* Home Route */}
                <Route path="/" element={<Hero />} />

                {/* Education Route */}
                <Route path="/education" element={<Education />} />

                {/* Experience Route */}
                <Route path="/experience" element={<Experience />} />

                <Route path="/certificates" element={<Certificates />} />

                {/* Projects Route */}
                <Route path="/projects" element={<Projects />} />

                {/* Contact Route */}
                <Route path="/contact" element={<Contact />} />

                {/* Fallback Route - Redirect to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Suspense>
        </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;