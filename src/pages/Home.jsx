// homepage call whole components
import { useState } from "react";
import AddressInput from "../components/AddressInput";
import MapDisplay from "../components/mapDisplay";
import NavigationButton from "../components/navigationButton";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

const libraries = ["places"];
const Home = () => {
  const [addresses, setAddresses] = useState(["K78 FT97"]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState(""); // ✅ 输入框的值

  const handleAddress = (address) => {
    setAddresses((prevAddresses) => [...prevAddresses, address]);
    setInputValue(""); // ✅ 每次输入后清空输入框
  };

  const handleClear = () => {
    setAddresses(["K78 FT97"]); // ✅ 清空地址列表
    setInputValue(""); // ✅ 清空输入框
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCUCmqXsJ_v1Kw5o0J9l7ldoediZql5ooo"
      onLoad={() => setIsLoaded(true)} // ✅ 设置加载状态为 true
      libraries={libraries}
      onError={(e) => console.error("Google Maps API 加载失败:", e)}
    >
      {isLoaded ? (
        <div>
          <h2>arrange the route</h2>
          <AddressInput
            onAdd={handleAddress}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <button onClick={handleClear}> clean the address</button>
          <NavigationButton addresses={addresses}></NavigationButton>
          <MapDisplay addresses={addresses}></MapDisplay>
        </div>
      ) : (
        <p>Loading...</p> // 显示加载提示
      )}
    </LoadScript>
  );
};
export default Home;
