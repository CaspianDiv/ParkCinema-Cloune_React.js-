import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <>
      <div className="bg-[#373737]">
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout
