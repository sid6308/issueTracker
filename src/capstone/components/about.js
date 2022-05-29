import React from "react";
import about from "../about.svg";
const About = () => {
  return (
    <div className="container about-info">
      <h1 className="hlead">About Us</h1>
      <img src={about} width={"50%"} alt="about" />
      <p className="plead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        asperiores consectetur porro et nostrum. Inventore eveniet vero ea,
        eaque alias autem saepe aspernatur voluptatibus dolore!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
        alias repellat suscipit at beatae facere libero debitis fugit, quidem
        dolor iusto vitae veritatis rerum aspernatur ducimus excepturi voluptas
        maiores sint reiciendis doloribus! Est eveniet esse debitis voluptatum
        id dolore!
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        provident harum sunt consectetur ut, laboriosam mollitia voluptas
        voluptate aliquid molestias impedit eveniet aspernatur nam eaque.
      </p>
    </div>
  );
};

export default About;
