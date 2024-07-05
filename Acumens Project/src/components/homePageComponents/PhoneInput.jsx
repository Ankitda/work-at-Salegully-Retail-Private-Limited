import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import { setCountryCode } from "../../redux/countryCodeSlice";

const countries = [
    { code: 'US', name: 'United States', phoneCode: '+1', flag: 'https://flagcdn.com/us.svg' },
    { code: 'CA', name: 'Canada', phoneCode: '+1', flag: 'https://flagcdn.com/ca.svg' }
];

function CountryFlagDropdown() {

    const { countryCode } = useSelector(state => state.countryCode)
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block w-20">
            <div
                className="relative w-20 py-2 text-left cursor-default sm:text-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center justify-center gap-2 px-2">
                    <img src={countryCode.flag} alt={countryCode.name} className="flex-shrink-0 h-6 w-6 rounded-full ml-2" />
                    <span className="block ">{countryCode.phoneCode}</span>
                    {isOpen ?
                        (
                            <span className="text-sm mr-2">
                                <IoIosArrowUp />
                            </span>
                        )
                        :
                        (
                            <span className="text-sm mr-2">
                                <IoIosArrowDown />
                            </span>

                        )}
                </span>

            </div>
            {isOpen && (
                <div className="absolute mt-1 w-28 rounded-md bg-white shadow-lg z-10">
                    <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {countries.map((country) => (
                            <li
                                key={country?.code}
                                className="cursor-default select-none relative py-2 pl-3 hover:bg-gray-100"
                                onClick={() => {
                                    dispatch(setCountryCode(country));
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center">
                                    <img src={country?.flag} alt={country?.name} className="flex-shrink-0 h-6 w-6 rounded-full" />
                                    <span className="ml-3 block truncate">{country?.phoneCode}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CountryFlagDropdown