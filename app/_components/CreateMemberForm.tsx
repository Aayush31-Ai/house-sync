
import React from 'react'
import createMember from '../_actions/createMember'

const CreateMemberForm = () => {
  const submit=async(data:FormData)=>{
    "use server"
    const result = await createMember(data)
    console.log(result);
    
  }
  return (
    <div>
      <form action={submit}>
        <input type="text" name="houseId" placeholder='houseId' />
        <input type="text" name="name" placeholder='name' />
        <input type="text" name="avatar" placeholder='avatar' />
        <button className='bg-yellow-300 text-black p-4 rounded-lg'>Create Member</button>
      </form>
    </div>
  )
}

export default CreateMemberForm