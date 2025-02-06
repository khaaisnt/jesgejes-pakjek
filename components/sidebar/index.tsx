import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen relative overflow-y-auto bg-purple-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">SekopTix</div>
      <nav className="flex w-full flex-col gap-5 p-4">
        <Link href="/karyawan/kereta" className='w-full py-2 px-4 hover:bg-purple-600 font-medium duration-200 rounded'>
          Kereta
        </Link>
        <Link href="/karyawan/pelanggan" className='w-full py-2 px-4 hover:bg-purple-600 font-medium duration-200 rounded'>
          Pelanggan
        </Link>
        <Link href="/karyawan/admin" className='w-full py-2 px-4 hover:bg-purple-600 font-medium duration-200 rounded'>
          Admin
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;