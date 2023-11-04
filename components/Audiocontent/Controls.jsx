'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5'
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io'

const Controls = ({
  audioRef,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  progressBarRef,
  duration,
  setTimeProgress,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const playAnimationRef = useRef()
  const [volume, setVolume] = useState(60)
  const [muteVolume, setMuteVolume] = useState(false)

  const repeat = useCallback(() => {
    const currentTime = audioRef?.current?.currentTime
    setTimeProgress(currentTime)
    progressBarRef.current.value = currentTime
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    )
    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [audioRef, duration, progressBarRef, setTimeProgress])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      playAnimationRef.current = requestAnimationFrame(repeat)
    } else {
      audioRef.current.pause()
      cancelAnimationFrame(playAnimationRef.current)
    }
  }, [isPlaying, audioRef, repeat])

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100
      audioRef.current.muted = muteVolume
    }
  }, [volume, audioRef, muteVolume])

  const skipForward = () => {
    audioRef.current.currentTime += 15
  }

  const skipBackward = () => {
    audioRef.current.currentTime -= 15
  }

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1
      setTrackIndex(lastTrackIndex)
      setCurrentTrack(tracks[lastTrackIndex])
    } else {
      setTrackIndex((prev) => prev - 1)
      setCurrentTrack(tracks[trackIndex - 1])
    }
  }

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0)
      setCurrentTrack(tracks[0])
    } else {
      setTrackIndex((prev) => prev + 1)
      setCurrentTrack(tracks[trackIndex + 1])
    }
  }

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
  }

  return (
    <div className='controls-wrapper'>
      <div className='controls'>
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        <button>
          <IoPlayBackSharp onClick={skipBackward} />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button>
          <IoPlayForwardSharp onClick={skipForward} />
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
      <div className='volume'>
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type='range'
          min={0}
          max={100}
          value={parseFloat(volume)}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, rgb(59, 200, 230) ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  )
}

export default Controls
