"use client"

import React from 'react'
import findPersonToPay from '../_actions/findPersonToPay';
import findPersonWhoPaysMe from '../_actions/findPersonWhoPaysMe';

const FindPersons = () => {

        const findPerson=async()=>{
const result = await findPersonToPay("695387f4c1b590faa05618dc","69538844c1b590faa05618e7")
console.log(result);

    }
    const whoPaysMe=async()=>{
        const result = await findPersonWhoPaysMe("695387f4c1b590faa05618dc","6953883cc1b590faa05618e3")
        console.log(result);
        
    }
  return (
    <div>
        <button onClick={findPerson} className='bg-white text-black p-4 rounded-md '>Find</button>
        <button onClick={whoPaysMe} className='bg-red-300 text-black p-3'> Find who pays me </button>
    </div>
  )
}

export default FindPersons