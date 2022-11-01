import { useState } from 'react';

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  const toggleButton = () => {
    if (visible) {
      return (<button onClick={toggleVisibility}>cancel</button>)
    }
    return (<button onClick={toggleVisibility}>{props.label}</button>)
  }

  return (
    <div>
      {visible ? props.children : null}
      {toggleButton()}
    </div>
  )
}

export default Toggleable;