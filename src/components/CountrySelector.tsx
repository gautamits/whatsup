import React, {useEffect, useMemo} from 'react'
import countryDialInfo from '../helpers/country-dial-info.json'
import History from './History'
import {Input, TextField, FormControl, InputLabel, Select, makeStyles, Button, Paper} from '@material-ui/core'
import useWhatsappLink from '../helpers/useWhatsappLink'

import createPersistedState from 'use-persisted-state';
const usePhoneState = createPersistedState('phone');
const useCountryState = createPersistedState('country');
const useHistory = createPersistedState('history');

interface History {
  number: string;
  name: string;
}

interface GlobalContext {
  history: History[];
  setHistory: React.Dispatch<React.SetStateAction<History[]>>;
  selectedCountry: string;
}

export const CountContext = React.createContext<GlobalContext>({history: [], setHistory: () => {}, selectedCountry: ''})

export default function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useCountryState('')
  const [phone, setPhone] = usePhoneState('')
  const [history, setHistory] = useHistory<History[]>([])
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight - 32)

  function handleResize(e:UIEvent) {
    setWindowHeight(window.innerHeight - 32)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  },[])

  const {href, phoneWithCountryCode} = useWhatsappLink({phone: `${selectedCountry}${phone}`})

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  function handleSubmit(e:any){
    e.preventDefault();
    setHistory([...history, {number: phoneWithCountryCode, name: phoneWithCountryCode}])
    window.location.href = href
  }
  const classes = useStyles();
  return (
    <CountContext.Provider
      value={{history, setHistory, selectedCountry}}
    >
      <Paper elevation={3}>
      <form onSubmit={handleSubmit} style={{height: windowHeight}}>
        <div>
          <FormControl
          >
            <InputLabel htmlFor="country">Country</InputLabel>
            <Select
              // native
              value={selectedCountry}
              onChange={e=>setSelectedCountry(e.target.value as string)}
              inputProps={{
                name: 'age',
                id: 'country',
              }}
            >
              {countryDialInfo.map(({name, flag, code, dial_code}) => <option value={dial_code}>{flag} {dial_code} {name}</option>)}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input required id="phone" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} />
          </FormControl> 
        </div>
        <History />
        <Button
          variant='contained'
          color='primary'
          type="submit"
        >
          start chat
        </Button>
      </form>
      </Paper>
     </CountContext.Provider>
  )
}