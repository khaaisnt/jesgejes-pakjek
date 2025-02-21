import { History } from "@/app/karyawan/types";

interface Props {
  item: History
}

const showTime = (date: string) => {
    const currentDate = new Date(date);
    return currentDate.toLocaleTimeString(`id-ID`, {
      year: `numeric`,
      month: `long`,
      day: `2-digit`,
    });
  };

  const HistoryCard = (props: Props) => {
    return (
      <div className='bg-white rounded-xl shadow-md border border-gray-100 p-8 w-full transition-all duration-300 hover:shadow-lg hover:border-sky-100'>
        <div className='grid grid-cols-4 gap-8 mb-10'>
          <InfoSection
            title="TGL ORDER"
            content={showTime(props.item.purchase_date)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <InfoSection
            title="Stasiun Awal"
            content={props.item.schedule_details.departured_location}
            subContent={showTime(props.item.schedule_details.departured_time)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            }
          />
          <InfoSection
            title="Stasiun Akhir"
            content={props.item.schedule_details.arrived_location}
            subContent={showTime(props.item.schedule_details.arrived_time)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            }
          />
          <InfoSection
            title="Nama Kereta"
            content={props.item.schedule_details.train_details?.name || "-"}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            }
          />
        </div>
  
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">List Penumpang</h1>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-gray-700 text-sm font-semibold py-4 px-6 text-left">Nama</th>
                  <th className="text-gray-700 text-sm font-semibold py-4 px-6 text-left">NIK</th>
                  <th className="text-gray-700 text-sm font-semibold py-4 px-6 text-left">Nomor Kursi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {props.item.purchases_details.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-800">{item.passanger_name}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.passanger_id}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 text-sm font-medium text-sky-700 bg-sky-50 rounded-full">
                        {item.seat_number}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  const InfoSection = ({ 
    title, 
    content, 
    subContent, 
    icon 
  }: { 
    title: string;
    content: string;
    subContent?: string;
    icon?: React.ReactNode;
  }) => (
    <div className='space-y-3 p-4 rounded-lg bg-gray-50 border border-gray-100'>
      <div className='flex items-center gap-2'>
        {icon}
        <div className='font-medium text-gray-500 text-sm'>{title}</div>
      </div>
      <div className="font-semibold text-gray-900 text-lg">{content}</div>
      {subContent && (
        <div className="text-sm text-gray-600">{subContent}</div>
      )}
    </div>
  );
  
  export default HistoryCard;