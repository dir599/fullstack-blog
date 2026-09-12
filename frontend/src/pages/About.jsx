import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
       <p className="mb-3 mt-2 text-sm font-semibold uppercase tracking-wider text-amber-600 flex justify-center">
            About Us
          </p>

      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero Section */}
        <section className="text-center bg-white shadow-md">
         

          <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
            About Our Blog
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Welcome to our blog platform — a place where developers can share
            ideas, learn new technologies, and discover useful articles from
            other developers.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mt-16 rounded-2xl bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 flex justify-center">
            Our Mission
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Our goal is to make sharing knowledge simple and accessible.
            We believe that developers learn faster when they share their
            experiences, ideas, and knowledge with each other.
          </p>
        </section>

        {/* What You'll Find */}
        <section className="mt-12 text-lg bg-white p-8 shadow-md sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 flex justify-center">
            What You'll Find Here
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Whether you're learning your first programming language or
            building full-stack applications, you'll find useful content
            here to help you improve your skills and grow as a developer.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;

