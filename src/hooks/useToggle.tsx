import { useState } from 'react';

const useToggle = (initialState = false): [boolean, () => void, () => void] => {
  const [status, setStatus] = useState(initialState);

  const activate = () => {
    setStatus(true);
  };

  const deactivate = () => {
    setStatus(false);
  };

  return [status, activate, deactivate];
};

export default useToggle;
