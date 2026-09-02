import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Home = () => {
  return (
    <div>
      <div className="pt-1">
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
