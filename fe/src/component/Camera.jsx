// hover -> x 버튼 표시

import { useState } from 'react'
import styled from '@emotion/styled'

const CamDiv = styled.div`
  width: 50%;
  height: 50%;
  background-color: red;
  display: inline-block;
`

function Camera({ id, name, removeCam }) {
  const [show, setshow] = useState(false)
  return (
    <CamDiv
      onMouseEnter={() => setshow(true)}
      onMouseLeave={() => setshow(false)}
    >
      {name}
      {show && <button onClick={() => removeCam(id)}>x</button>}
    </CamDiv>
  )
}

export default Camera
