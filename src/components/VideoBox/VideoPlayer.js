import * as React from "react";
import videoConnect from 'react-html5video';
import 'react-html5video/dist/styles.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

import {green500} from 'material-ui/styles/colors'

let PLAYING = false;

const style = {
  floatButtonMute : {
    backgroundColor : green500,
  },
  chip: {
    margin : 4,
  }
}

const VideoPlayer = ({ video, videoEl, children, ...restProps }) => (

  <div className="box box-default">
    <div className="box-body video">

      <div className="controls">
        <div className="top-left">

        </div>
        <div className="top-right">
          {!video.paused && <a href="#" onClick={(e) => {

            e.preventDefault();
            // You can do what you like with the HTMLMediaElement DOM element also.

            videoEl.pause();
            PLAYING = false;
          }}>
            Pause video
          </a>}
          {video.paused && <a href="#" onClick={(e) => {

            e.preventDefault();
            // You can do what you like with the HTMLMediaElement DOM element also.
            videoEl.play();
            PLAYING = true;
          }}>
            Play video
          </a>}
        </div>
        <div className="bottom-left">
          <Chip style={style.chip}>
            <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
            100
          </Chip>
        </div>
        <div className="bottom-right">
          <FloatingActionButton mini={true} backgroundColor={style.floatButtonMute.backgroundColor} onTouchTap={function (e) {
            e.preventDefault();
            if(video.muted) {
              videoEl.muted = false;
            }else {
              videoEl.muted = true;
            }

          }}>
            {video.muted && <AvVolumeOff />}
            {!video.muted && <AvVolumeUp />}
          </FloatingActionButton>
        </div>
      </div>

      <video {...restProps}>
        { children }
      </video>

    </div>
  </div>
);

export default videoConnect(VideoPlayer)

