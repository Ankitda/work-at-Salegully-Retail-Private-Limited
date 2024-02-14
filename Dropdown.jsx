import { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"; // install the dependencies in package.json
import { IoAddCircleOutline, IoPersonCircle } from "react-icons/io5";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative w-64">
            <div className="text-black bg-white w-full hover:border-slate-950 border border-slate-200 font-medium rounded-md text-sm px-5 py-3 text-center inline-flex items-center cursor-pointer"
                onClick={toggleDropdown}
            >
                <span className='text-2xl mr-3'><IoPersonCircle /></span>
                My Brand
                <span className="w-2.5 h-2.5 text-2xl ml-24 mb-4">{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
                <span className="absolute -top-3 left-3 bg-white px-2 py-1 text-xs font-medium text-black">Switch Brand</span>
            </div>
            <div className={`z-10 ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownButton">
                    <li className='flex flex-row items-center justify-start space-x-1 hover:bg-gray-100 pl-3 bg-gray-100 w-full'>
                        <span className='text-lg'><IoPersonCircle /></span>
                        <a href="#" className="px-4 py-2 text-md">
                            My Brand
                        </a>
                    </li>
                    <li className='flex flex-row items-center justify-start space-x-1 hover:bg-gray-100 pl-3'>
                        <span className='text-lg'><IoAddCircleOutline /></span>
                        <a href="#" className="px-4 py-2 text-md">
                            Add New Brand
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;