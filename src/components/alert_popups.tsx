export default function alert_popups() {
    return (
      <div className="w-72 h-48 bg-white border-2 border-black rounded-lg p-5">
        <div className="mb-5">
          <span className="text-lg font-semibold">Beralih ke WhatsApp</span>
        </div>
        <div className="mb-3">
          <span className="text-sm">Anda akan dialihkan ke WhatsApp untuk menghubungi Ketua RW</span>
        </div>
        <div className="flex justify-between w-full">
          <button className="w-24 h-9 rounded-md font-medium border-2 border-[#3D8FED] text-[#3D8FED]">
            <span>Batal</span>
          </button>
          <button className="w-24 h-9 rounded-md font-medium bg-[#3D8FED] text-white">
            <span>Lanjutkan</span>
          </button>
        </div>
      </div>
    );
  }