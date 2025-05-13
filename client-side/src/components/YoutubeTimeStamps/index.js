import React, { Component } from "react";
import Navbar from '../Navbar';
import Cookies from 'js-cookie'
import { GoArrowUpRight } from "react-icons/go";
import {
  YoutubeTimeStampsMainPage,
  YoutubeTimeStampsPageBody,
  YTFirstHalf,
  YTSecondHalf,
  YTUrlEntry,
  YTUrlInput,
  YTGoBtn,
  MarkedNotesH,
  TimestampButton,
  TimestampList,
  TimestampItem,
} from './styledComponents.js';

class YoutubeTimeStamps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideoSelected: false,
      vidId: "",
      videoUrl: "",
      timestamps: [],
      playerReady: false,
      currentNote: '',
    };

    this.player = null; // YouTube player instance
  }

  getVideoId(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    const vid_id = match ? match[1] : null;
    console.log(`Extracted Video ID: ${vid_id}`);
    this.setState({
      vidId: vid_id,
      isVideoSelected: true,
      playerReady: false,
    });
  }

  ionclick = () => {
    const { videoUrl } = this.state;
    this.getVideoId(videoUrl);
  };

  onChangeVideoUrlInput = (event) => {
    this.setState({
      videoUrl: event.target.value,
    });
  };

  onPlayerReady = (event) => {
    console.log("Player is ready");
    this.setState({ playerReady: true });
  };

  componentDidMount() {
    console.log("Initializing YouTube API...");
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API is ready");
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { vidId } = this.state;

    if (prevState.vidId !== vidId && vidId !== "") {
      console.log("Initializing YouTube player...");
      // Create a new YouTube player
      this.player = new window.YT.Player("youtube-player", {
        videoId: vidId,
        events: {
          onReady: this.onPlayerReady, 
          onError: (event) => {
            console.error("YouTube Player Error: ", event);
          },
        },
      });
    }
  }

  saveNotes = async () => {
    const { timestamps, videoUrl } = this.state;
    const username = Cookies.get('username');
    const jwtToken = Cookies.get('jwt_token');

    if (!jwtToken) {
      console.error("JWT token is missing");
      return;
    }

    const newTimeStamps = [{username,videoUrl},timestamps]

    const apiUrl = `http://localhost:3333/yttimestamps`;
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newTimeStamps), // Send the timestamps array as JSON
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const responseData = await response.json();
        console.log("Timestamps saved:", responseData);
        alert("Timestamps saved successfully!");
      } else {
        console.error("Failed to save timestamps");
        alert("Failed to save timestamps.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  captureTimestamp = () => {
    const { playerReady } = this.state;

    if (playerReady && this.player) {
      // Directly call getCurrentTime
      const currentTime = this.player.getCurrentTime();
      console.log(`Captured Timestamp: ${currentTime}`);
      
      this.setState((prevState) => ({
        timestamps: [...prevState.timestamps, { time: currentTime, note: prevState.currentNote }],
        currentNote: '', // Clear current note after saving
      }));
      
    } else {
      console.error("Player is not ready yet. Please wait.");
      alert("Player is not ready yet. Please wait a moment and try again.");
    }
  };

  handleNoteChange = (event) => {
    this.setState({ currentNote: event.target.value });
  };

  // Utility function to convert seconds to "minutes:seconds" format
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Ensures two-digit seconds
  }

  render() {
    const { vidId, isVideoSelected, timestamps, currentNote, playerReady } = this.state;
    console.log(timestamps)
    // Ensure that the src URL uses HTTPS
    const srcUrl = `https://www.youtube.com/embed/${vidId}?enablejsapi=1`; // Added enablejsapi=1

    return (
      <YoutubeTimeStampsMainPage>
        <Navbar selectedMenu="youtube" />
        <YoutubeTimeStampsPageBody>
          <YTFirstHalf id="ytIframe">
            <YTUrlEntry>
              <YTUrlInput
                placeholder="Enter Your Url...."
                onChange={this.onChangeVideoUrlInput}
              />
              <YTGoBtn onClick={this.ionclick}>
                <GoArrowUpRight />
              </YTGoBtn>
            </YTUrlEntry>
            {isVideoSelected && (
              <iframe
                id="youtube-player"
                src={srcUrl}
                style={{ width: "100%", height: "80%" }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </YTFirstHalf>
          <YTSecondHalf>
            <MarkedNotesH>Notes:</MarkedNotesH>
            <textarea
              placeholder="Write your notes here..."
              value={currentNote}
              onChange={this.handleNoteChange}
              style={{ width: "100%", height: "100px", outline: 'none', padding: '12px' }}
            />
            <div style={{display: 'flex', justifyContent:'space-between'}}>
                <TimestampButton 
                onClick={this.captureTimestamp} 
                disabled={!playerReady} // Disable if player is not ready
                >
                Add Note
                </TimestampButton>
                <TimestampButton onClick={this.saveNotes}> Save Notes </TimestampButton>
            </div>
            <TimestampList>
              {timestamps.map((entry, index) => (
                <TimestampItem key={index}>
                    {this.formatTime(entry.time)} - Note: {entry.note}
                </TimestampItem>
              ))}
            </TimestampList>
          </YTSecondHalf>
        </YoutubeTimeStampsPageBody>
      </YoutubeTimeStampsMainPage>
    );
  }
}

export default YoutubeTimeStamps;