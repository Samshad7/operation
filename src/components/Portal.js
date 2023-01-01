import React,{useEffect} from "react";


const Portal = ({children}) => {
    const mount = document.getElementById("portal-root");
    const el = document.createElement("div");
  
    useEffect(() => {
      mount.appendChild(el);
      return () => mount.removeChild(el);
    }, [el, mount]);
  
    return React.createPortal(children, el)
  };

  export default Portal;