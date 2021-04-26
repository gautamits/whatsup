import React, {useMemo} from 'react'
import countryDialInfo from './country-dial-info.json'
import Select from 'react-select';

import createPersistedState from 'use-persisted-state';
const usePhoneState = createPersistedState('phone');
const useCountryState = createPersistedState('country');

export default function () {
  const [selectedOption, setSelectedOption] = useCountryState(null)
  const [phone, setPhone] = usePhoneState('')
  const {href, phoneWithCountryCode} = useMemo(() => {
    if(selectedOption && phone) {
      return {
        href: `https://api.whatsapp.com/send?phone=${selectedOption.value}${phone}`,
        phoneWithCountryCode: `${selectedOption.value}${phone}`
      }
    }
    return {href: '#', phoneWithCountryCode: ''}
  }, [selectedOption, phone])
  return (
    <form action={href} method="get">
    <fieldset>
      <div style={{width:'150px'}}>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={countryDialInfo.map(({name, flag, code, dial_code})=>({label: `${flag} ${dial_code} ${name}`, value: dial_code}))}
        />
      </div>
      <input type="hidden" name={'phone'} value={phoneWithCountryCode} /> 
     <input placeholder='phone number' required className="phone-number" type="tel" value={phone} onChange={e=>setPhone(e.target.value)}/>
    </fieldset>
     <input type="submit" value="start chat"/>
     </form>
  )
}