import React, { useState } from 'react';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    ph: '',
    rainfall: '',
    temperature: '',
    humidity: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <section className="py-16 bg-white" id="crop">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Crop Recommendation</h2>
        <div className="max-w-2xl mx-auto bg-green-50 rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(formData).map(([key]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key}
                  </label>
                  <input
                    type="number"
                    name={key}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={`Enter ${key}`}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Get Recommendation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}