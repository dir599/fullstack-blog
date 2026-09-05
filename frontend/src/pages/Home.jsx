import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios"


const Home = () => {
  const fetchBlogs = async()=>{
    const response = await axios.get("http://localhost:9000/user/all")
  }

  useEffect(()=>{
     fetchBlogs()
  },[])
  return (
    <div>
      <div className="rounded-xl">
        <Navbar />
      </div>
      <div className="pt-1 flex flex-wrap gap-6 justify-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <h1>This is home page.</h1>
    </div>
  );
};

export default Home;
