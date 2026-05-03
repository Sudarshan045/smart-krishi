export const districts = ['Nashik', 'Pune', 'Ahmednagar', 'Sangli', 'Aurangabad', 'Satara', 'Solapur'];
export const seasons = ['Kharif', 'Rabi'];

export const regionCropData = {
  Nashik: {
    Kharif: [
      { name: { en: 'Grapes', mr: 'द्राक्ष' }, suitability: 98, yield: '20-25 t/ha', profit: '₹8-12 Lakh/ha', soil: { en: 'Sandy Loam', mr: 'रेताड लोम' } },
      { name: { en: 'Onion', mr: 'कांदा' }, suitability: 95, yield: '25-30 t/ha', profit: '₹2-4 Lakh/ha', soil: { en: 'Black Clay', mr: 'काळी माती' } },
      { name: { en: 'Pomegranate', mr: 'डाळिंब' }, suitability: 88, yield: '15-20 t/ha', profit: '₹5-7 Lakh/ha', soil: { en: 'Well-drained', mr: 'पाण्याचा निचरा होणारी' } },
    ],
    Rabi: [
      { name: { en: 'Wheat', mr: 'गहू' }, suitability: 92, yield: '4-5 t/ha', profit: '₹1-1.5 Lakh/ha', soil: { en: 'Heavy Soil', mr: 'भारी जमीन' } },
      { name: { en: 'Gram', mr: 'हरभरा' }, suitability: 85, yield: '1.5-2 t/ha', profit: '₹60-80k/ha', soil: { en: 'Medium Black', mr: 'मध्यम काळी' } },
    ]
  },
  Pune: {
    Kharif: [
      { name: { en: 'Sugarcane', mr: 'ऊस' }, suitability: 96, yield: '100-120 t/ha', profit: '₹3-5 Lakh/ha', soil: { en: 'Heavy Black', mr: 'भारी काळी' } },
      { name: { en: 'Soybean', mr: 'सोयाबीन' }, suitability: 90, yield: '2-3 t/ha', profit: '₹80-120k/ha', soil: { en: 'Medium Soil', mr: 'मध्यम जमीन' } },
    ],
    Rabi: [
      { name: { en: 'Jowar', mr: 'ज्वारी' }, suitability: 94, yield: '2-3 t/ha', profit: '₹50-70k/ha', soil: { en: 'Medium Black', mr: 'मध्यम काळी' } },
    ]
  },
  Ahmednagar: {
    Kharif: [
      { name: { en: 'Onion', mr: 'कांदा' }, suitability: 94, yield: '25-30 t/ha', profit: '₹2-4 Lakh/ha', soil: { en: 'Loamy', mr: 'लोमी' } },
      { name: { en: 'Bajra', mr: 'बाजरी' }, suitability: 90, yield: '1.5-2 t/ha', profit: '₹40-60k/ha', soil: { en: 'Light Soil', mr: 'हलकी जमीन' } },
    ],
    Rabi: [
      { name: { en: 'Wheat', mr: 'गहू' }, suitability: 88, yield: '4 t/ha', profit: '₹1 Lakh/ha', soil: { en: 'Medium Black', mr: 'मध्यम काळी' } },
    ]
  },
  Sangli: {
    Kharif: [
      { name: { en: 'Turmeric', mr: 'हळद' }, suitability: 97, yield: '20-25 t/ha', profit: '₹4-6 Lakh/ha', soil: { en: 'Medium Red', mr: 'मध्यम तांबडी' } },
      { name: { en: 'Grapes', mr: 'द्राक्ष' }, suitability: 95, yield: '18-22 t/ha', profit: '₹7-10 Lakh/ha', soil: { en: 'Sandy Loam', mr: 'रेताड लोम' } },
    ],
    Rabi: [
      { name: { en: 'Sugarcane', mr: 'ऊस' }, suitability: 92, yield: '90-110 t/ha', profit: '₹3 Lakh/ha', soil: { en: 'Heavy Black', mr: 'भारी काळी' } },
    ]
  },
  Aurangabad: {
    Kharif: [
      { name: { en: 'Cotton', mr: 'कापूस' }, suitability: 96, yield: '2-3 t/ha', profit: '₹1.5-2 Lakh/ha', soil: { en: 'Black Cotton', mr: 'काळी कापसाची जमीन' } },
      { name: { en: 'Maize', mr: 'मका' }, suitability: 92, yield: '5-6 t/ha', profit: '₹1-1.2 Lakh/ha', soil: { en: 'Medium Soil', mr: 'मध्यम जमीन' } },
    ],
    Rabi: [
      { name: { en: 'Gram', mr: 'हरभरा' }, suitability: 90, yield: '2 t/ha', profit: '₹80k/ha', soil: { en: 'Black Clay', mr: 'काळी माती' } },
    ]
  },
  Satara: {
    Kharif: [
      { name: { en: 'Ginger', mr: 'आले' }, suitability: 95, yield: '15-18 t/ha', profit: '₹5-8 Lakh/ha', soil: { en: 'Loamy', mr: 'लोमी' } },
      { name: { en: 'Strawberry', mr: 'स्ट्रॉबेरी' }, suitability: 98, yield: '10-12 t/ha', profit: '₹10-15 Lakh/ha', soil: { en: 'Laterite', mr: 'जांभी जमीन' } },
    ],
    Rabi: [
      { name: { en: 'Wheat', mr: 'गहू' }, suitability: 85, yield: '4 t/ha', profit: '₹1 Lakh/ha', soil: { en: 'Heavy Soil', mr: 'भारी जमीन' } },
    ]
  },
  Solapur: {
    Kharif: [
      { name: { en: 'Pomegranate', mr: 'डाळिंब' }, suitability: 97, yield: '15-20 t/ha', profit: '₹6-9 Lakh/ha', soil: { en: 'Arid/Dry', mr: 'कोरडी जमीन' } },
      { name: { en: 'Jowar', mr: 'ज्वारी' }, suitability: 94, yield: '2-3 t/ha', profit: '₹50-80k/ha', soil: { en: 'Shallow Black', mr: 'उथळ काळी जमीन' } },
    ],
    Rabi: [
      { name: { en: 'Grape', mr: 'द्राक्ष' }, suitability: 88, yield: '18 t/ha', profit: '₹6 Lakh/ha', soil: { en: 'Sandy Loam', mr: 'रेताड लोम' } },
    ]
  }
};
