import React, { useState, useEffect } from 'react';

function About() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    fetch('http://arthurpiau.ide.3wa.io:9001/about')
      .then((res) => res.json())
      .then((data) => setAbout(data));
  }, []);
  
    return(
        <div id="divAbout">
          <h2>About GreenHarvest Enterprises</h2>
          <p> Welcome to GreenHarvest Valley, birthplace of our own pride in dedicating ourselves into transforming the world of agriculture through innovation, sustainability, and, most importantly, quality. As we embark on this journey together, we 'd like to share with you our unwavering commitment to delivering the finest agricultural products to meet your needs.

            At GreenHarvest Enterprises, quality isn 't just a standard; it's our way of life. We understand that the success of your agricultural endeavors depends on the caliber of the products you choose, and we take that responsibility seriously. Here are many reasons why you can and should trust us:</p>
          <ul>
            <li>1. <span className="underline">Expertise :</span> With decades of experience in the agricultural industry, our team comprises experts who are passionate about what they do. From selecting the best seeds to employing cutting-edge farming techniques, we are driven by a profound understanding of agriculture's complexities.</li>

            <li>2. <span className="underline">Sustainable Practices:</span> We believe that quality begins with sustainability. Our commitment to environmentally-friendly farming practices ensures that our products not only meet high standards but also contribute to a healthier planet. We take pride in being stewards of the land.</li>

            <li>3. <span className="underline">Rigorous Quality Control:</span> Every product that leaves our facility undergoes rigorous quality control checks. From soil health and crop management to post-harvest processing, we leave no stone unturned in ensuring that what you receive is nothing but the best.</li>

            <li>4. <span className="underline">Innovation:</span> Agriculture is an ever-evolving field, and we are at the forefront of innovation. We continuously invest in research and development to bring you the latest advancements that can enhance your yields and sustainability efforts.</li>

            <li>5. <span className="underline">Customer-Centric Approach:</span> Our commitment extends beyond our products. We are here to support you at every step of your agricultural journey. Our team of experts is just a phone call or email away, ready to assist with advice and solutions tailored to your specific needs.</li>
          </ul>
          <p>In conclusion, we invite you to explore our website and discover the wide range of agricultural products we offer. Each product embodies the values of quality, sustainability, and innovation that define GreenHarvest Enterprises. We are not just a supplier; we are your partner in agricultural excellence.</p> 
          <p>Thank you for considering us as your trusted source for agricultural solutions. Together, we can cultivate a brighter, more sustainable future for agriculture.</p>
          <p>Sincerely,</p>
          <p>Harvey Farmwell,</p>
          <p>CEO, GreenHarvest Enterprises</p> 
        </div>
    )
}

export default About
