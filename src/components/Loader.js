import React, {useState} from 'react'
import ClipLoader from 'react-spinners/ClipLoader'




const Loader = () => {
    let [loading,] = useState(true);
    return (
       
              <div className="sweet-loading">
               <ClipLoader color="white" loading={loading}  size={80} />
              </div>
        
    )
}

export default Loader