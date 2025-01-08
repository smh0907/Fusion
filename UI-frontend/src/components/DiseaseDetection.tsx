import React, { useState } from 'react';
import { Upload } from 'lucide-react';

function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      handleDiseasePrediction(file);
    }
  };

  const handleDiseasePrediction = async (file: File) => {
    setLoading(true);
    setPrediction(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/disease-predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();

      if (data.success) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || 'An unknown error occurred');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleShowResult = () => {
    if (prediction) {
      setIsModalOpen(true);
    }
  };

  const handleDownloadPrediction = () => {
    if (prediction) {
      const blob = new Blob([prediction], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'prediction_result.html'; 
      link.click();
      URL.revokeObjectURL(link.href); 
    }
  };

  return (
    <section className="py-16 bg-white" id="disease">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Plant Disease Detection</h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 rounded-xl p-8 shadow-lg">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Upload a photo of your plant</p>
                <p className="text-sm text-gray-500">
                  Supported formats: JPG, PNG (max 5MB)
                </p>
              </label>
            </div>

            {selectedImage && (
              <div className="mt-6">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="max-w-full rounded-lg"
                />
              </div>
            )}

            {loading && (
              <div className="mt-4 flex justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            )}

            {!loading && prediction && (
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleShowResult}
              >
                Show Prediction Result
              </button>
            )}
            {error && (
              <p className="mt-4 text-red-500 font-bold">Error: {error}</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-lg w-3/5 max-h-[80%] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleModalClose}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">Prediction Result</h3>
            <div
              className="text-gray-800"
              dangerouslySetInnerHTML={{ __html: prediction || '' }}
            ></div>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleDownloadPrediction}
            >
              Download Prediction Result
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default DiseaseDetection;
