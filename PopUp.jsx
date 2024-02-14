const Popup = ({ showPopup, setShowPopup, message }) => {
    
    return (
      <div className={`fixed top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 bg-opacity-75 text-white p-6 rounded-md shadow-lg ${showPopup ? 'block' : 'hidden'} w-auto md:top-1/2`} style={{ backdropFilter: 'blur(5px)' }}>
        <div className="relative mr-5">
          <button className="absolute -top-1 -right-4 text-black text-xl" onClick={() => {
            console.log("onclick is fired");
            setShowPopup(!showPopup)
            }}>×</button>
          <p className='text-center text-black'>{message}</p>
        </div>
      </div>
    );
  };
  
  export default Popup;
  