import { User } from '../types'
import { getServerCookie } from '@/helper/server.cookie'
import { axiosInstance } from '@/helper/api'
import AddCustomer from './Addcustomer'
import Customer from './Customer'
export const dynamic = "force-dynamic";

const getAllCustomer = async (): Promise<User[]> => {
        try {
            const token = await getServerCookie('token')

            const response: any = await axiosInstance.get('/customer', {
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

    const customers = await getAllCustomer()

  return (
    <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold text-black">Data Customer</h1>
            <span className="text-sm text-black">
                Halaman ini memuat data customer
            </span>
            <div className="my-3">
               <AddCustomer/>
               {
                customers.map((customer, index) => (
                    <Customer item={customer} key={`customer-${index}`} />
                ))
               }
            </div>
    </div>
  )
}

export default page