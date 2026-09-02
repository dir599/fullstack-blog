// import React from 'react'
// import hero from "../assets/hero.png"

// const Card = () => {
//   return (
//     <div className='h-96 w-80 border-2 rounded-2xl overflow-hidden'>
//       <div className="h-48 w-full">
//         <img src={hero} alt="This is card" className="h-full w-full object-cover"/>
//       </div>
//       <div className="p-4">
//         <p className='line-clamp-3'>Lorem ipsum dolor sifjklfjalksajfksfjkfajlj. kfjkjf. flkjkfjk. kjfksdljfrkj kjkaj kjrke alrk jejej lkjaelkj kej alejrk jakej ekj j ejekl t amet, consectetur adipisaliquid illum ex dolore.
//         </p>
//       </div>
//       <div className="p-4">
//         <button className='bg-amber-600 text-white px-4 py-2 rounded-lg'>Read more</button>
//       </div>
//     </div>
//   )
// }

// export default Card
import hero from "../assets/hero.png";

const Card = () => {
  return (
    <article className="w-80 overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* Image */}
      <div className="h-48 w-full">
        <img
          src={hero}
          alt="Blog post"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold">
          My Blog Title
        </h2>

        <p className="mt-2 line-clamp-3 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Fugit adipisci distinctio temporibus accusamus, reprehenderit
          repellat, debitis optio mollitia id, repudiandae culpa
          repellendus quas ipsa suscipit fuga aliquid illum ex dolore.
        </p>
      </div>

      {/* Button */}
      <div className="px-4 pb-4">
        <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
          Read More
        </button>
      </div>

    </article>
  );
};

export default Card;