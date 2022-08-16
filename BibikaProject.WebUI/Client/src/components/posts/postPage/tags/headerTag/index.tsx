import { FC } from "react";

interface HeaderTagProps {
    name: string,
    value: string
}

const HeaderTag: FC<HeaderTagProps> = (props) => {
  return (
    <div className="header-tag">
        <span className="name">
            {props.name}: 
        </span>
        <span className="value">
            {" "}{props.value}
        </span>
    </div>
  )
}

export default HeaderTag;
