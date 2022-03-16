import { useRef, useState, useEffect } from 'react'

function Test() {
  const [cameras, setcameras] = useState([])
  const videoRef = useRef(null)
  useEffect(()=> {
    getConnectedDevices('videoinput')
    
  })
  
  function updateDeviceList() {
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      audioList.innerHTML = "";
      videoList.innerHTML = "";
  
      devices.forEach(device => {
        let elem = document.createElement("li");
        let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);
  
        elem.innerHTML = "<strong>" + device.label + "</strong> (" + direction + ")";
        if (type === "audio") {
          audioList.appendChild(elem);
        } else if (type === "video") {
          videoList.appendChild(elem);
        }
      });
    });
  }

  navigator.mediaDevices.ondevicechange = event => {
    updateDeviceList();
  }
  

  async function play() {
    try {
      const constraints = { video: true, audio: false }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (videoRef.current) videoRef.current.srcObject = stream
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

  async function logDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log(devices)
  }

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={play}>켜기</button>
      <button onClick={stop}>끄기</button>
      <button onClick={logDevices}>장치목록</button>
      {cameras.map((camera) => (
        <p>camera</p>
      ))}
    </div>
  )
}

export default Test
