import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen relative overflow-y-auto bg-purple-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">SekopTix</div>
      <nav className="flex flex-col gap-5 p-4">
        <Link href="/karyawan/kereta">
          <span className="py-2 px-4 hover:bg-purple-600 font-medium duration-200 rounded">Kereta</span>
        </Link>
        <Link href="/karyawan/pelanggan">
          <span className="py-2 px-4 hover:bg-purple-600 font-medium duration-200 rounded">Pelanggan</span>
        </Link>
        <Link href="/karyawan/admin">
          <span className="py-2 px-4 hover:bg-purple-600 font-medium duration-200 rounded">Admin</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;