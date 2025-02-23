// input the address(automatically compelete the address)
import { useRef, useState } from "react";
import PropTypes from "prop-types";
// import GooglePlaceAutoComplete from "react-google-places-autocomplete";
import { Autocomplete } from "@react-google-maps/api";
const AddressInput = ({ onAdd, inputValue, setInputValue }) => {
  // const [value, setValue] = useState("");

  const autocompleteRef = useRef(null);

  const handleSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      console.log("📍 选中的地点数据:", place);
      if (place && place.address_components) {
        const formattedAddress = place.formatted_address || place.name;
        console.log(formattedAddress, "=====formattedAddress=====");
        const addressComponents = place.address_components;
        let newAddress = addressComponents
          .map((component) => component.long_name)
          .join(", ");
        console.log("拼接后的地址:", formattedAddress);
        console.log(newAddress, "=====newAddress====");
        onAdd(newAddress);
        setInputValue("");
      } else {
        console.warn(
          "选中的 `place` 没有 `formatted_address`，可能需要手动解析！"
        );
      }
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handleSelect}
      options={{
        componentRestrictions: { country: "IE" },
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Please enter the address"
        style={{ width: "300px", padding: "8px" }}
      />
    </Autocomplete>
  );
};

AddressInput.propTypes = {
  onAdd: PropTypes.func.isRequired, // ✅ 添加 prop-types 校验
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

export default AddressInput;
