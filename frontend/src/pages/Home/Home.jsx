import React, { useState, useEffect } from 'react';
import './test.css';

const Home = () => {
  const images = ['https://images.ctfassets.net/lzny33ho1g45/best-texting-app-p-img/30d51505d0e19ef15cee4dd597ae49d9/Group_9937.png',
        'https://images.ctfassets.net/lzny33ho1g45/44cBIf3RDTZXlcB34ocQNq/5f47f78cf8dff48a7c883a9535f8853d/85925d8e42ac8911949cb5d7aa1842a7.jpg',
        'https://cdn4.vectorstock.com/i/1000x1000/55/68/chat-message-app-ui-kit-design-vector-34385568.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/fs/b65d48104353905.5f611e5244f3e.jpg',
      'https://c8.alamy.com/comp/2H4FXJ5/realistic-smartphone-with-messaging-app-sms-text-frame-conversation-chat-screen-with-green-message-bubbles-and-placeholder-text-social-media-2H4FXJ5.jpg',
      'https://geekyants.com/_next/image?url=https%3A%2F%2Fstatic-cdn.geekyants.com%2Fscreenimages%2F3%2F2023-04-06%2F219367586-1680789579.png&w=3840&q=75'];
 return (
    <div className="all-carousels-container">
      <h1>Overview
ChatApp is an innovative chat application designed to create a secure community for communication. The core idea behind ChatApp is to ensure absolute privacy: messages are permanently deleted from the database upon deletion or logout, ensuring that no trace remains.

</h1>
      
      <div className="carousel-section">
        <h2>
Key Features
Permanent Message Deletion:
Every message—whether text, image, video, or voice—is automatically removed from the database when deleted or upon logging out, ensuring maximum privacy.

Diverse Messaging Options:
ChatApp supports a variety of message types including text, images, videos, and voice messages.

Voice and Video Calls:
In addition to messaging, users can easily make voice and video calls.

User-Friendly Interface:
With a simple and attractive design, ChatApp offers an easy-to-use experience for users of all ages.

</h2>
        <CylinderCarousel images={images} />
      </div>

      <div className="carousel-section">
        <h2>Target Audience
        ChatApp is designed for everyone. Its intuitive design and straightforward functionality make it accessible to users regardless of their age or technical background.</h2>
        <SphereCarousel images={images} />
      </div>

      <div className="carousel-section">
        <h2>Technology Used
ChatApp is built entirely with the MERN Stack (MongoDB, Express, React, and Node.js), and leverages tools like FrontEndRedux for an efficient, smooth, and responsive experience.

</h2>
        <StackedCarousel images={images} />
      </div>



      <div className="carousel-section">
        <h2>Future Vision
Looking ahead, we plan to introduce additional features to further enhance the user experience:

Stories: Share daily updates in a story format.

Group Chats: Engage in group conversations—whether text-based or voice-based.

Enhanced Interactivity: Future updates may include innovative features such as dynamic group interactions and advanced friend tracking capabilities.

</h2>
        <SpiralCarousel images={images} />
         </div>
         <h1>Privacy | Security | Speed | Simplicity | Innovation😊😊</h1>
    </div>
  );
};

// 1. Cylinder Carousel Component
const CylinderCarousel = ({ images }) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => prev - (360 / images.length));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="cy-carousel-wrapper">
      <div className="cy-carousel-container">
        <div 
          className="cy-carousel"
          style={{
            transform: `rotateY(${angle}deg)`,
            transition: 'transform 2s ease-in-out'
          }}
        >
          {images.map((img, index) => (
            <div 
              key={index}
              className="cy-carousel-slide"
              style={{
                transform: `rotateY(${index * (360 / images.length)}deg) translateZ(300px)`
              }}
            >
              <img src={img} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Sphere Carousel Component
const SphereCarousel = ({ images }) => {
  const [angles, setAngles] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setAngles(prev => ({
        x: prev.x - 0.5,
        y: prev.y - 0.5
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sp-carousel-wrapper">
      <div className="sp-carousel-container">
        <div 
          className="sp-carousel"
          style={{
            transform: `rotateX(${angles.x}deg) rotateY(${angles.y}deg)`
          }}
        >
          {images.map((img, index) => {
            const phi = Math.acos(-1 + (2 * index) / images.length);
            const theta = Math.sqrt(images.length * Math.PI) * phi;
            return (
              <div 
                key={index}
                className="sp-carousel-slide"
                style={{
                  transform: `
                    rotateY(${theta}rad)
                    rotateX(${phi}rad)
                    translateZ(300px)
                    rotateY(-${theta}rad)
                    rotateX(-${phi}rad)
                  `,
                  opacity: 0.9
                }}
              >
                <img src={img} alt={`Image ${index + 1}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 3. Stacked Cards Carousel Component
const StackedCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="st-carousel-wrapper">
      <div className="st-carousel-container">
        {images.map((img, index) => {
          const offset = (index - currentIndex + images.length) % images.length;
          const zIndex = images.length - offset;
          const scale = 1 - (offset * 0.05);
          const opacity = offset === 0 ? 1 : 0.7;
          
          return (
            <div 
              key={index}
              className="st-carousel-slide"
              style={{
                transform: `translateX(${offset * 30 - 30}px) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity
              }}
            >
              <img src={img} alt={`Image ${index + 1}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};


const SpiralCarousel = ({ images }) => {
    const [angle, setAngle] = useState(0);
    
    // إعدادات خاصة بالشكل الحلزوني
    const spiralSettings = {
      radius: 250,    // نصف قطر الحلزون
      itemCount: 8,   // عدد العناصر المرئية
      speed: 0.5      // سرعة الدوران
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        setAngle(prev => prev - spiralSettings.speed);
      }, 30);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="spiral-carousel-wrapper">
        <div className="spiral-carousel-container">
          {images.slice(0, spiralSettings.itemCount).map((img, index) => {
            // حساب المواقع في الشكل الحلزوني
            const spiralAngle = angle + (index * (360 / spiralSettings.itemCount));
            const zOffset = index * 30;
            const xPos = Math.sin(spiralAngle * Math.PI / 180) * spiralSettings.radius;
            const yPos = Math.cos(spiralAngle * Math.PI / 180) * spiralSettings.radius;
            
            return (
              <div 
                key={index}
                className="spiral-carousel-item"
                style={{
                  transform: `
                    translateX(${xPos}px)
                    translateY(${yPos}px)
                    translateZ(${zOffset}px)
                    rotateY(${spiralAngle}deg)
                  `,
                  opacity: 0.9 - (index * 0.1),
                  zIndex: spiralSettings.itemCount - index
                }}
              >
                <img src={img} alt={`Image ${index + 1}`} />
              </div>
            );
          })}
        </div>
      </div>
    );
};
export default Home;