import { Gridd } from './Common'
import Camera from './Camera'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Room() {
  const { roomId } = useParams()
  const [cams, setcams] = useState([])
  useEffect(
    // axios로 카메라 목록 가져오기
    () =>
      setcams([
        { id: 1, name: 'hi1' },
        { id: 2, name: 'hi2' },
        { id: 3, name: 'hi3' },
        { id: 4, name: 'hi4' },
      ]),
    []
  )

  function add() {
    // 어떤 처리를?
    setcams([...cams, { id: cams.length + 1, name: 'new' }])
  }
  function removeCam(id) {
    console.log(id)
    setcams(cams.filter((cam) => cam.id !== id))
  }

  return (
    <Gridd container height="100vh">
      <Gridd item xs={1.5}>
        방 식별자:{roomId}
        <button onClick={add}>카메라추가</button>
        <button>메뉴로</button>
      </Gridd>
      <Gridd item xs={10.5}>
        {cams.map((cam) => (
          <Camera
            key={cam.id}
            name={cam.name}
            id={cam.id}
            removeCam={removeCam}
          />
        ))}
      </Gridd>
    </Gridd>
  )
}
