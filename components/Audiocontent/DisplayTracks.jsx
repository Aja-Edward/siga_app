import React from 'react'
import { BsMusicNoteBeamed } from 'react-icons/bs'

const DisplayTracks = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration
    setDuration(seconds)
    progressBarRef.current.max = seconds
    console.log(audioRef.current.duration)
  }

  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className='audio-info'>
        <div className='audio-image'>
          {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt='audio avatar' />
          ) : (
            <div className='icon-wrapper'>
              <span className='audio-icon'>
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className='text'>
          <p className='audiotitle'>{currentTrack.title}</p> <br />
          <p>{currentTrack.author}</p>
        </div>
      </div>
    </div>
  )
}

export default DisplayTracks
