import React from 'react'

export default function useWhatsappLink({phone}: {phone: string}){
  return React.useMemo(() => {
    if(phone) {
      return {
        href: `https://api.whatsapp.com/send?phone=${phone}`,
        phoneWithCountryCode: `${phone}`
      }
    }
    return {href: '#', phoneWithCountryCode: ''}
  }, [phone])
}