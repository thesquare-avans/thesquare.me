
import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import {green500} from 'material-ui/styles/colors'

let metadata = {
  user : "Thomas",
  viewers : 100,
};

const style = {
  floatButtonMute : {
    backgroundColor : green500,
  },
  chip: {
    margin : 4,
  }
};

class ReactHls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      playerId : Date.now()
    };

    this.video = {
      muted : true
    }

    this.hls = null;
  }

  componentDidUpdate () {
    this._initPlayer();

    //this.video = this.refs.video;
  }

  componentDidMount () {
    this._initPlayer();

    //this.video = this.refs.video;
  }

  componentWillUnmount () {
    let { hls } = this;

    if (hls) {
      hls.destroy();
    }
  }

  _initPlayer () {
    if (this.hls) {
      this.hls.destroy();
    }

    let { url, autoplay, hlsConfig } = this.props;
    let { video : $video } = this.refs;
    let hls = new Hls(hlsConfig);

    hls.detachMedia();
    hls.loadSource(url);
    hls.attachMedia($video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (autoplay) {
        $video.play();
      }

      if(this.video.muted) {
        $video.muted = this.video.muted;
      }
    });

    hls.on(Hls.Events.ERROR, function (event, data) {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // when try to recover network error
            console.log("fatal network error encountered, try to recover");
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log("fatal media error encountered, try to recover");
            hls.recoverMediaError();
            break;
          default:
            // when cannot recover
            hls.destroy();
            break;
        }
      }
    });

    this.hls = hls;
  }

  render () {
    let { playerId } = this.state;
    let { controls, width, height } = this.props;

    return(
      <div className="box box-default" key={playerId}>
        <div className="box-body video">

          <div className="controls viewing">
            <div className="top-left">
              <Chip style={style.chip}>
                <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
                { metadata.viewers }
              </Chip>
            </div>
            <div className="top-right">
              <p>{metadata.user}</p>
            </div>
            <div className="bottom-left">

            </div>
            <div className="bottom-right">
              {/*<FloatingActionButton*/}
                {/*mini={true}*/}
                {/*backgroundColor={style.floatButtonMute.backgroundColor}*/}
                {/*onTouchTap={function (e) {*/}
                  {/*e.preventDefault();*/}
                  {/*this.refs*/}
                {/*}}*/}
              {/*>*/}
                {/*{this.video.muted && <AvVolumeOff />}*/}
                {/*{!this.video.muted && <AvVolumeUp />}*/}
              {/*</FloatingActionButton>*/}
            </div>
          </div>
          <video ref="video"
                 id={`react-hls-${playerId}`}
                 controls={controls}
                 width={width}
                 height={height} poster="/assets/offline.png">
            {/*{children}*/}
          </video>
        </div>
      </div>
    );

    // return (
    //   <div key={playerId} className="player-area">
    //     <video ref="video"
    //            className="hls-player"
    //            id={`react-hls-${playerId}`}
    //            controls={controls}
    //            width={width}
    //            height={height}></video>
    //   </div>
    // )
  }
}

ReactHls.propTypes = {
  url : PropTypes.string.isRequired,
  autoplay : PropTypes.bool,
  hlsConfig : PropTypes.object, //https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning
  controls : PropTypes.bool,
  width : PropTypes.number,
  height : PropTypes.number
}

ReactHls.defaultProps = {
  autoplay : false,
  hlsConfig : {},
  controls : true,
  width : 500,
  height : 375
}

module.exports = ReactHls;
