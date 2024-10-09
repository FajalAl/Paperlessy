import React, { useState } from 'react';

const Crypto1 = () => {
  const slides = [
    { image: '/Crypto.png', message: 'Start your crypto journey young! Save your pocket money, make it grow with crypto.' },
    { image: '/138f54a6237a48018c662a709e67f924-1@2x.png', message: 'Student life can be tough, but investing smartly in crypto could change your financial future.' },
    { image: '/crpte.png', message: 'Even the curious ones can learn about crypto. It’s never too late to join the financial revolution.' },
    { image: '/hand.jpg', message: 'Reach out for new opportunities! Crypto offers a way to secure a future for you and your family.' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div 
      className="c" 
      style={{ 
        backgroundColor: '#1A1A40', // Dark indigo blue (crypto-inspired color)
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',  // Stack sections vertically
        justifyContent: 'flex-start',
        alignItems: 'center' 
      }}
    >
      {/* Slideshow Section */}
      <div 
        className="slideshow" 
        style={{ 
          width: '80%',  // Reduce slideshow size
          maxWidth: '800px',  // Set a max width for larger screens
          margin: '20px 0',  // Add vertical margin for spacing
          backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent black background
          padding: '20px', 
          borderRadius: '10px', 
          textAlign: 'center'
        }}
      >
        <div className="slide" onClick={nextSlide} style={{ cursor: 'pointer' }}>
          <img 
            src={slides[currentSlide].image} 
            alt="Crypto Slide" 
            style={{ 
              maxWidth: '100%', 
              height: 'auto', 
              borderRadius: '10px' 
            }} 
          />
          <p style={{
            color: '#FFD700', // Gold color for the message (crypto, wealth theme)
            fontSize: '2em',  // Equivalent to h2 size
            fontWeight: 'bold',  // Bold for emphasis
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Subtle shadow to make it pop
            textTransform: 'uppercase',  // Makes the text uppercase for more attention
            marginTop: '20px',
            lineHeight: '1.4',  // Adjust line height for readability
          }}>
            {slides[currentSlide].message}
          </p>
        </div>
      </div>

      {/* Reading Invitation Section */}
      <div 
  className="reading-invite" 
  style={{ 
    padding: '80px', 
    textAlign: 'center', 
    fontSize: '1.5em', 
    lineHeight: '1.6',
    backgroundColor: '#2C2C54', // Darker indigo shade for contrast
    color: '#FFFFFF',  // Light text color for readability
    width: '80%',
    maxWidth: '800px',
    borderRadius: '10px',
    marginBottom: '40px'
  }}
>
  <h2 style={{ fontSize: '2.5em', color: '#FFD700' }}>Dive Deeper, But Proceed With Caution</h2>
  <p>
    Before diving into the world of crypto, ensure you’re well-informed. Research, understand the risks, and make safe choices.
    Start here with reliable resources and detailed guides on the crypto landscape.
  </p>

  {/* Book Section */}
  <div className="books" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
    {/* Mastering Bitcoin */}
    <a href="/Andreas M. Antonopoulos - Mastering Bitcoin_ Unlocking digital crypto-currencies-O'Reilly Media (2014).epub" target="_blank">
      <img 
        src="/Mastering Bitcoin by Andreas M. Antonopoulos.jpg" 
        alt="Mastering Bitcoin by Andreas M. Antonopoulos" 
        style={{ width: '150px', height: 'auto', borderRadius: '10px' }}
      />
    </a>

    {/* The Basics of Bitcoins and Blockchains */}
    <a href="/Antony Lewis - The Basics of Bitcoins and Blockchains_ An Introduction to Cryptocurrencies and the Technology that Powers Them-Mango Publishing Group (2018).epub" target="_blank">
      <img 
        src="/The Basics of Bitcoins and Blockchains by Antony Lewis.jpg" 
        alt="The Basics of Bitcoins and Blockchains by Antony Lewis" 
        style={{ width: '150px', height: 'auto', borderRadius: '10px' }}
      />
    </a>

    {/* Cryptoassets */}
    <a href="/Chris Burniske, Jack Tatar - Cryptoassets_ The Innovative Investor’s Guide to Bitcoin and Beyond-McGraw-Hill Education (2017).epub" target="_blank">
      <img 
        src="/Cryptoassets.jpg" 
        alt="Cryptoassets by Chris Burniske and Jack Tatar" 
        style={{ width: '150px', height: 'auto', borderRadius: '10px' }}
      />
    </a>
  </div>
</div>

      {/* Video Section */}
      <div 
        className="video-section" 
        style={{
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px', 
          width: '80%', 
          maxWidth: '1000px', 
          marginBottom: '40px'
        }}
      >
        <div className="video">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/xvo_m_r2ubg"
            title="Crypto Basics"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2 style={{ color: '#FFD700' }}>What is Crypto? Basics for Beginners</h2>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/1YyAzVmP9xQ?si=Hdn6iv-gwKzCK3IR"
            title="Crypto Investment"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2 style={{ color: '#FFD700' }}>Crypto Investment Tips for Students</h2>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Yb6825iv0Vk"
            title="Crypto for Business"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2 style={{ color: '#FFD700' }}>Crypto is Transforming Businesses and You</h2>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/hYip_Vuv8J0"
            title="Securing Your Future"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2 style={{ color: '#FFD700' }}>Securing Your Future by Knowing More</h2>
        </div>
      </div>
    </div>
  );
};

export default Crypto1;
