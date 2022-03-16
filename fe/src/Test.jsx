import { useRef, useState, useEffect } from 'react'

function Test() {
  const [available, setavailable] = useState([])
  const videoRef = useRef([])
  const [cams, setcams] = useState([])
  useEffect(() => {
    updateDeviceList()
  }, [])

  function updateDeviceList() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setavailable(devices.filter((device) => device.kind === 'videoinput'))
    })
  }

  navigator.mediaDevices.ondevicechange = (e) => {
    updateDeviceList()
  }

  async function play(constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      // console.log(stream)
      // if (videoRef.current) videoRef.current.srcObject = stream
      return stream
    } catch (error) {
      console.error('Error opening video camera.', error)
    }
  }
  function stop() {
    const stream = videoRef.current.srcObject
    const tracks = stream.getTracks()

    tracks.forEach(function (track) {
      track.stop()
    })
    videoRef.current.srcObject = null
  }

  async function addCam(e) {
    if (!e.target.value) return
    await setcams([
      ...cams,
      { audio: false, video: { deviceId: e.target.value } },
    ])
    videoRef.current.push({ srcObject: play() })
  }

  return (
    <div>
      <video
        sref={videoRef}
        // src={cams[0]}
        autoPlay
      />
      <button onClick={play}>켜기</button>
      <button onClick={stop}>끄기</button>
      <label htmlFor="cam-select">카메라선택:</label>
      <select name="pets" id="cam-select" onClick={(e) => addCam(e)}>
        <option value="">--Please choose an option--</option>
        {available.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Test
