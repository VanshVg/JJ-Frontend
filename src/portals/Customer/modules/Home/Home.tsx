import { logoPath } from "../../../../types/constants";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <div>
        <img
          src={logoPath}
          className="h-[130px] w-[130px] md:h-[150px] md:w-[150px] cursor-pointer mx-auto"
        />
      </div>
      <Navbar />
      <h1>Homepage</h1>
    </div>
  );
};

export default Home;
