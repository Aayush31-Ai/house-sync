import addExpenses from "../_actions/addExpenses"
import getAllMembers from "../_actions/getAllmembers"

const HOUSE_ID = "695387f4c1b590faa05618dc"
const CURRENT_MEMBER_ID = "6953883cc1b590faa05618e3"

const MemberForm = async () => {
  const membersRes = await getAllMembers(HOUSE_ID, CURRENT_MEMBER_ID)
  const members = membersRes.success ? membersRes.data : []

  const handleAddExpense = async (formData: FormData) => {
    "use server"
    await addExpenses(formData, CURRENT_MEMBER_ID)
  }

  return (
    <div>
      <form action={handleAddExpense} className="flex flex-col gap-3">
        <input type="number" name="amount" placeholder="amount" className="border p-2" required />

        {members?.length === 0 && (
          <p className="text-sm text-gray-500">No members found.</p>
        )}

        {members?.map((member: any) => (
          <label
            key={member?._id}
            className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100"
          >
            <input
              type="checkbox"
              name="sharedWith"
              value={member?._id}
              className="w-4 h-4"
            />
            <span>{member?.name}</span>
          </label>
        ))}

        <input type="text" name="note" placeholder="note" className="border p-2" />
        <input type="file" name="proof" className="border p-2" />

        <button type="submit" className="bg-amber-500 text-black p-3 rounded">
          Submit
        </button>
      </form>
    </div>
  )
}

export default MemberForm