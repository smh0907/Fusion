# FUSION–Agricultural Hub

AI-Driven Crop and Soil Intelligence

Repository: https://github.com/smh0907/Fusion

-------

## Project Overview

FUSION–Agricultural Hub is a proof-of-concept web application that uses machine learning and deep learning to help farmers optimize:

- crop selection  
- fertilizer usage  
- plant disease detection  

-------

## Features

### Crop Recommendation

Input soil nutrient values (N, P, K), pH, temperature and humidity.  
Output the best-fit crop for planting.

### Fertilizer Recommendation

Input soil nutrient profile and target crop.  
Output nutrient deficiencies or excesses and recommended fertilizer mix.

### Plant Disease Detection

Upload a photograph of a leaf.  
Output disease classification, background information and treatment suggestions.

-------

## Motivation

Farming supports many economies and livelihoods, especially in developing countries. By applying ML and DL to soil and crop data, we can move toward smarter, data-driven farming that:

- maximizes yield  
- reduces input waste  
- limits disease impact  

-------

## Built With

- Python  
- Flask  
- scikit-learn  
- TensorFlow / Keras  
- React  
- Next.js  
- Tailwind CSS  

-------

## Data Sources

- custom crop recommendation dataset  
- custom fertilizer suggestion dataset  
- public plant disease image datasets  

-------

## How to Run Locally

1. clone the repo  
   ```bash
   git clone https://github.com/smh0907/Fusion.git
   cd Fusion
   ```

2. set up the backend  
   - install Anaconda or Miniconda  
   - create and activate environment  
     ```bash
     conda create -n fusionhub python=3.8
     conda activate fusionhub
     ```  
   - install requirements  
     ```bash
     pip install -r requirements.txt
     ```  
   - start the Flask API  
     ```bash
     python app.py
     ```  
   The API will run at http://127.0.0.1:5000/

3. set up the frontend  
   - install Node.js (v14+) and npm  
     - Windows/macOS: download from https://nodejs.org  
     - Ubuntu/Debian:
       ```bash
       curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
       sudo apt-get install -y nodejs
       ```  
   - in project root:
     ```bash
     npm install
     npm run dev
     ```  
   The frontend will run at http://localhost:3000/ and proxy API calls.

-------

## How to Use

- for crop recommendation: enter N-P-K ratios, pH, state and city  
- for fertilizer suggestion: enter soil nutrients and crop type  
- for disease detection: upload a leaf image (supports selected crops only)

-------

## Notebooks and Resources

- crop recommendation notebook on Kaggle  
- disease detection notebook on Kaggle  
- demo video on YouTube (e.g. Krish Naik’s channel)

-------

## Disclaimer

This project is a proof-of-concept. Data are unverified and results carry no guarantee. Do not use for real-world farming decisions.  
