import PropTypes from "prop-types";

const VideoEmbed = ({ src }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

VideoEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default VideoEmbed;