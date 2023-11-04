'use client'

import { useRef, useEffect, useState } from 'react'
// import ReactAudioPlayer from 'react-audio-player'
import { useAudio } from 'react-awesome-audio'
import { tracks } from './tracks'
import DisplayTracks from './DisplayTracks'
import Controls from './Controls'
import ProgressBar from './ProgressBar'

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex])
  const audioRef = useRef(null)
  const progressBarRef = useRef()

  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  console.log(currentTrack)

  return (
    <div className='audio-player'>
      <div className='inner'>
        <DisplayTracks
          {...{ currentTrack, audioRef, setDuration, progressBarRef }}
        />
        <div style={{ flex: 1 }}>
          <Controls
            {...{
              audioRef,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              progressBarRef,
              duration,
              setTimeProgress,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
