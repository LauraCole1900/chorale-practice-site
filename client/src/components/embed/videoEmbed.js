import PropTypes from "prop-types";
import "./style.css";

const VideoEmbed = ({ src }) => {


  return (
    <div className="videoResponsive">
      <iframe
        width="853"
        height="480"
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
};

VideoEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default VideoEmbed;