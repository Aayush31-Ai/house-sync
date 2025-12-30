import React from 'react'
import createHouse from '../_actions/createHouse'
import findPersonToPay from '../_actions/findPersonToPay'

const CreateHouseForm = () => {
 
    const submit = async(data:FormData)=>{
       "use server"
        await createHouse(data)
    }


  return (
    <div>
<form action={submit}>
  <input type="text" name='houseName' placeholder='houseName' />
  <button className='bg-pink-300 p-4 rounded-lg'>Create House</button>
</form>

    </div>
  )
}

export default CreateHouseForm