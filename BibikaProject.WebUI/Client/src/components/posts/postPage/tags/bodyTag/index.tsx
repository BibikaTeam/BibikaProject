import React, { FC } from 'react'

interface BodyTagProps {
    text: string,
}

const BodyTag: FC<BodyTagProps> = (props) => {
  return (
    <div className="body-tag">
        {props.text}
    </div>
  )
}

export default BodyTag