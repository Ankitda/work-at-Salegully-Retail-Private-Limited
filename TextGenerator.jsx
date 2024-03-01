import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DataLoader from "../../../components/DataLoader";

const TextGenerator = () => {

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState([]);
  const [backendResponse, setBackendResponse] = useState({
    isPromptRecieved: false,
    isLoading: false,
    isErrorFetched: false
  });
  const buttonDisabled = useRef(false);
  const errorMessage = useRef('');
  const isSamePrompt = useRef('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  useEffect(()=> {
    isSamePrompt.current = prompt;
  },[prompt])

  const parseString = (str) => {
    const parts = str.split("**");
    console.log("parts : ", parts);
    const heading = parts[2].replace(/[\n\\]/g, '').trim();
    const subheading = parts[4].replace(/[\n\\]/g, '').trim();
    const caption = parts[6].replace(/[\n\\\#]/g, '').trim();

    const hashtagsRegex = /#[^\s#]*/g;
    const hashtags = str.match(hashtagsRegex);

    return {
      heading: heading,
      subheading: subheading,
      caption: caption,
      hashtags: hashtags
    };
  }


  const handleClick = async () => {

    if (prompt === '') {
      setBackendResponse((prevData) => (
        { ...prevData, isPromptRecieved: true }
      ));
      // console.log("value is empty");
      return;
    }

    try {
      buttonDisabled.current = true;
      setBackendResponse((prevData) => (
        { ...prevData, isLoading: true, isPromptRecieved: false, isErrorFetched: false }
      ));
      const result = await axios.post('http://localhost:5000/generate', { prompt });
      // console.log(result.data.text);
      const parsedData = parseString(result.data.text);
      console.log("parse data : ", parsedData);

      setBackendResponse((prevData) => (
        { ...prevData, isLoading: false }
      ));
      setResponse((prevData) => (
        [parsedData, ...prevData]
      ));
      buttonDisabled.current = false;
    } catch (error) {
      setBackendResponse((prevData) => (
        { ...prevData, isLoading: false, isErrorFetched: true }
      ));
      buttonDisabled.current = false;
      errorMessage.current = error.message;
      console.log(errorMessage.current);
      // console.error('Error fetching generated content:', error);
    }
  }

  // console.log(response);



  return (
    <div className="flex flex-col gap-8 lg:gap-20 w-full h-auto lg:flex-row justify-center items-center">
      <div className="p-2">
        <label className="form-control w-full md:w-[700px] border-info">
          <div className="label">
            <span className="label-text">Choose Category</span>
          </div>
          <select value={prompt} onChange={handlePromptChange} className="select select-bordered focus:outline-none">
            <option disabled>
              Search for categories
            </option>
            <option value={"Business"}>Business</option>
            <option value={"Change"}>Change</option>
            <option value={"Character"}>Character</option>
            <option value={"Competition"}>Competition</option>
            <option value={"Conservative"}>Conservative</option>
            <option value={"Courage"}>Courage</option>
            <option value={"Education"}>Education</option>
            <option value={"Faith"}>Faith</option>
            <option value={"Family"}>Family</option>
            <option value={"Famous Quotes"}>Famous Quotes</option>
            <option value={"Film"}>Film</option>
            <option value={"Freedom"}>Freedom</option>
            <option value={"Friendship"}>Friendship</option>
            <option value={"Future"}>Future</option>
            <option value={"Happiness"}>Happiness</option>
            <option value={"History"}>History</option>
            <option value={"Honor"}>Honor</option>
          </select>
        </label>
        <button className="btn btn-info text-white mt-5" onClick={handleClick} disabled={buttonDisabled.current}>{isSamePrompt.current === prompt ? "Regenerate" : "Generate"}</button>
      </div>


      <div className="border-2 border-slate-950 rounded-lg w-auto h-[350px] lg:w-[1000px] lg:h-[500px] p-6 overflow-auto">
        {backendResponse.isLoading && <DataLoader />}
        {backendResponse.isErrorFetched && <p className="font-medium text-xl text-center mt-[20%]">Sorry ! Some Error Occured : {errorMessage.current}</p>}
        {!backendResponse.isPromptRecieved && response?.map((item, index) => (
          <div key={index} className="p-4 flex flex-col space-y-4">

            <p><span className="text-lg mr-2 font-semibold">Heading :</span>{item.heading}</p>
            <p><span className="text-lg mr-2 font-semibold">SubHeading :</span>{item.subheading}</p>
            <p><span className="text-lg mr-2 font-semibold">Caption :</span>{item.caption}</p>
            <p><span className="text-lg mr-2 font-semibold">Hashtags :</span>{item.hashtags}</p>

            <hr className="w-full h-1 bg-black rounded-full" />
          </div>
        ))}
        {backendResponse.isPromptRecieved && <p className="font-medium text-xl text-center mt-[20%]"> Please Select the Option </p>}
      </div>
    </div>
  );
};

export default TextGenerator;