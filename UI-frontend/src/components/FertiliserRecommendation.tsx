import React, { useState } from 'react';
import toast from 'react-hot-toast';

const FertilizerRecommendation: React.FC = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorous: '',
    pottasium: '',
    cropname: '',
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/fertilizer-predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();

      if (data.recommendation) {
        setPrediction(data.recommendation);
        setIsModalOpen(true); 
      } else {
        toast.error(data.error || 'An unknown error occurred');
        setError(data.error || 'An unknown error occurred');
      }
    } catch (err: any) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDownloadPrediction = () => {
    if (prediction) {
      // Create a Blob from the prediction text
      const blob = new Blob([prediction], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'fertilizer_recommendation.html'; 
      link.click();
      URL.revokeObjectURL(link.href); 
    }
  };

  return (
    <div className="bg-white-50 min-h-screen flex justify-center items-center p-4 " id='fertilizer'>
      <div className="bg-green-50 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Fertilizer Guide</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium">Nitrogen (N)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-md"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Phosphorous (P)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-md"
              name="phosphorous"
              value={formData.phosphorous}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium">Pottasium (K)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-md"
              name="pottasium"
              value={formData.pottasium}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium">Crop You Want to Grow</label>
            <select
              name="cropname"
              className="w-full p-3 border rounded-md"
              value={formData.cropname}
              onChange={handleChange}
              required
            >
              <option value="">Select crop</option>
              <option value="rice">Rice</option>
              <option value="maize">Maize</option>
              <option value="chickpea">Chickpea</option>
              <option value="kidneybeans">Kidney Beans</option>
              <option value="pigeonpeas">Pigeon Peas</option>
              <option value="mothbeans">Moth Beans</option>
              <option value="mungbeans">Mung Beans</option>
              <option value="blackgram">Black Gram</option>
              <option value="lentil">Lentil</option>
              <option value="pomegranate">Pomegranate</option>
              <option value="banana">Banana</option>
              <option value="mango">Mango</option>
              <option value="grapes">Grapes</option>
              <option value="watermelon">Watermelon</option>
              <option value="muskmelon">Muskmelon</option>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="papaya">Papaya</option>
              <option value="coconut">Coconut</option>
              <option value="cotton">Cotton</option>
              <option value="jute">Jute</option>
              <option value="coffee">Coffee</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-md font-semibold"
          >
            Predict
          </button>
        </form>

        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-lg w-3/5 max-h-[80%] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleModalClose}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">Prediction Result</h3>
            <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: prediction || '' }} />
         
            {prediction && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleDownloadPrediction}
              >
                Download Prediction Result
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendation;
