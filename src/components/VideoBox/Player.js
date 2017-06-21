
import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import {green500} from 'material-ui/styles/colors'

//let fragment = 1;

let metadata = {
  user : "Stream",
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

class Player extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      playerId : Date.now(),
    };

    this.video = {
      muted : false
    };

    this.fragment = 0;
    this.loaded = false;
  }

  componentDidUpdate () {
    //this._initPlayer();

    //this.video = this.refs.video;
  }

  componentDidMount () {
    this._initPlayer();

    //this.video = this.refs.video;
  }

  componentWillUnmount () {

  }

  _initPlayer () {
    if(!this.loaded) {
      axios.get("http://145.49.13.101:8080/stream/mediaSequence?stream=" + this.props.streamId)
        .then(res => {
          this.fragment = res.data.mediaSequence;
          console.log(this.fragment);
          this.loaded = true;
          this.setState({fragment: res.data.mediaSequence})
        }).catch(err => {
          throw err;
      });
    }

    let {video: $video} = this.refs;

    $video.src = "http://145.49.13.101:8080/stream/fragment.mp4?stream=" + this.props.streamId +"&mediaSequence=" + this.fragment;
    // $video.src = "/assets/download.mp4";
    $video.poster = "/assets/offline.png";
    $video.autoplay = true;

    $video.addEventListener('error', error => {
      if(this.loaded) {
        $video.src = "http://145.49.13.101:8080/stream/fragment.mp4?stream=" + this.props.streamId +"&mediaSequence=" + this.fragment;
        $video.poster = "/assets/offline.png";
      }
      // this.fragment++;
    });

    $video.addEventListener('ended', data => {
      // console.log(data);
      this.fragment++;
      $video.poster = null;
      $video.src = "http://145.49.13.101:8080/stream/fragment.mp4?stream=" + this.props.streamId +"&mediaSequence=" + this.fragment;

    });
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
              <FloatingActionButton
                mini={true}
                backgroundColor={style.floatButtonMute.backgroundColor}
                onTouchTap={function (e) {
                  e.preventDefault();
                }}
              >
                {this.video.muted && <AvVolumeOff />}
                {!this.video.muted && <AvVolumeUp />}
              </FloatingActionButton>
            </div>
          </div>
          <video ref="video"
                 id={`react-hls-${playerId}`}
                 controls={controls}
                 width={width}
                 height={height} type="video/mp4">
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

Player.propTypes = {
  streamId : PropTypes.string.isRequired,
  stream : PropTypes.string.isRequired,
};

module.exports = Player;
