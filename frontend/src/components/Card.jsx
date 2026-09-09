import { Link } from "react-router-dom";


const Card = (props) => {
  return (
  
     <article className="w-80 overflow-hidden border bg-white shadow-sm rounded-2xl">
      {/* image */}
      <div className="h-48 w-full">
        <img src={props.value.coverImage} alt="photo" className="h-full w-full object-cover" />
      </div>

      {/* body */}
      <div className="p-4">
        <h2 className="text-xl font-bold">{props.value.title}</h2>
        <p className="line-clamp-3 mt-2 text-gray-600">
         {props.value.description}
        </p>
      </div>

      {/* button */}
      <div className="px-4 pb-4">
         <Link to={`/blog/${props.value.id}`}>
        <button className=" bg-black rounded-lg text-white hover:bg-gray-600 px-6 py-2">Read more!</button>
         </Link>
    
      </div>
    </article>
    
  );
};

export default Card;
