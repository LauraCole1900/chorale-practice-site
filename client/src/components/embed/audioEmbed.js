import PropTypes from "prop-types";

const AudioEmbed = ({ title, src }) => {
  console.log({ title }, { src });

  return (
    <div className="audio-responsive" >
      <audio
        src={src}
        title={title}
        controls
      />
    </div>
  )
};

AudioEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioEmbed;