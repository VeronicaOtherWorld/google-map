// create the google maps navigation button
import PropTypes from "prop-types";
import "../css/styles.css"; // 导入外部的CSS文件

const NavigationButton = ({ addresses }) => {
  if (addresses.length < 2) return null;
  const origin = encodeURIComponent(addresses[0]);
  const destination = encodeURIComponent(addresses[addresses.length - 1]);
  const waypoints = addresses
    .slice(1, -1)
    .map((address) => encodeURIComponent(address))
    .join("|");
  const googleMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;

  return (
    <a
      href={googleMapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="button"
    >
      navigation in the google map
    </a>
  );
};
NavigationButton.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.string).isRequired, // ✅ 添加 prop-types 校验
};

export default NavigationButton;
