import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero';
import Features from './components/Features/Features';
import CropRecommendation from './components/CropRecommendation/CropRecommendation';
import DiseaseDetection from './components/DiseaseDetection';
import Blog from './components/Blog/Blog';
import BlogDetail from './components/Blog/BlogDetail';
import FertilizerRecommendation from './components/FertiliserRecommendation';
import { Toaster } from 'react-hot-toast';

function Layout() {
  const location = useLocation();
  const isBlogDetailPage = location.pathname.startsWith('/blog/');

  return (
    <>
      {!isBlogDetailPage && (
        <>
          <Toaster position="top-center" />
          <Header />
          <Hero />
          <Features />
          <CropRecommendation />
          <FertilizerRecommendation />
          <DiseaseDetection />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
