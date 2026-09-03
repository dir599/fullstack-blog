import hero from "../assets/hero.png"
import React from "react";

const Card = () => {
  return (
    <article className="w-80 overflow-hidden border bg-white shadow-sm rounded-2xl">
      {/* image */}
      <div className="h-48 w-full">
        <img src={hero} alt="photo" className="h-full w-full object-cover" />
      </div>

      {/* body */}
      <div className="p-4">
        <h2 className="text-xl font-bold">Title of Blog</h2>
        <p className="line-clamp-3 mt-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ipsa
          commodi molestias! Iusto cum, repedipisci hic quod doloremque dolores
          nobis quia?
        </p>
      </div>

      {/* button */}
      <div className="px-4 pb-4">
        <button className=" bg-black rounded-lg text-white hover:bg-gray-600">Read more!</button>
      </div>
    </article>
  );
};

export default Card;
