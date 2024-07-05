import { createSlice } from '@reduxjs/toolkit'

export const countryCodeSlice = createSlice({
    name: 'countryCode',
    initialState: {
        countryCode: { code: 'US', name: 'United States', phoneCode: '+1', flag: 'https://flagcdn.com/us.svg' }
    },
    reducers: {
        setCountryCode: (state, action) => {  

            // console.log("payload fetched :",action.payload);
        
            state.countryCode = {
                code : action.payload.code,
                name : action.payload.name,
                phoneCode : action.payload.phoneCode,
                flag : action.payload.flag
            };

        }
    }
})

// Action creators are generated for each case reducer function
export const { setCountryCode } = countryCodeSlice.actions

export default countryCodeSlice.reducer