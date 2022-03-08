import React from 'react'
import WhatsappLink from './WhatsappLink';
import {CountContext} from './CountrySelector'
import {
  // Link,
  List,
  // ListItem, ListItemText, ListItemIcon
} from '@material-ui/core'

export default function History({}) {
  const {history} = React.useContext(CountContext)
  return (
    <List style={{overflow:'auto'}}>
      {history.map((hist, idx)=><WhatsappLink {...hist} index={idx}/>)}
    </List>
  )
}