import React from 'react';

const blogPosts = [
  {
    title: 'Understanding NPK Values',
    excerpt: 'Learn how to calculate and interpret Nitrogen, Phosphorous, and Potassium levels in your soil.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800',
  },
  {
    title: 'Soil Testing Guide',
    excerpt: 'A comprehensive guide to testing your soil and understanding the results.',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=800',
  },
  {
    title: 'Sustainable Farming Practices',
    excerpt: 'Discover eco-friendly farming methods that improve soil health and crop yield.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800',
  },
];

export default function Blog() {
  return (
    <section className="py-16 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Agricultural Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-green-600 font-semibold hover:text-green-700">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}