import { Employee } from '../types'
import { getServerCookie } from '@/helper/server.cookie'
import { axiosInstance } from '@/helper/api'
import AddAdmin from './AddEmployee'
import Admin from './Employee'

const getAllEmployee = async (): Promise<Employee[]> => {
        try {
            const token = await getServerCookie('token')

            const response: any = await axiosInstance.get('/employee', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if(response.data.success == true) {
                return response.data.data
            }

            return []
        } catch (error) {
            console.log(error);
            return []
        }
}
const page = async () => {
    const employees = await getAllEmployee()
    console.log(employees)

  return (
    <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold text-black">Data Petugas</h1>
            <span className="text-sm text-black">
                Halaman ini memuat data petugas
            </span>
            <div className="my-3">
               <AddAdmin/>
               {
                employees.map((employee, index) => (
                    <Admin item={employee} key={`employee-${index}`} />
                ))
               }
            </div>
    </div>
  )
}

export default page