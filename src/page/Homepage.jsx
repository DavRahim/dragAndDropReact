import Dropzone from "../components/Dropzone";

const Homepage = () => {
  return (
    <section className="">
      <div className="container mx-auto">
        <h1 className=" text-3xl font-bold text-blue-500">Upload Image</h1>
        <Dropzone />
      </div>
    </section>
  );
};

export default Homepage;
