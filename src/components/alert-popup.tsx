export default function AlertPopup() {  
  return<div className="w-72 h-48 bg-white shadow-md rounded-lg p-5">
    <div className="mb-4">
      <span className="text-xl font-semibold">Beralih ke WhatsApp</span>
    </div>
    <div className="mb-6">
      <span className="text-sm">Anda akan dialihkan ke WhatsApp untuk menghubungi Ketua RW</span>
    </div>
    <div className="flex gap-4 w-full">
      <button className="w-full h-9 rounded-md font-medium border-2 border-blue-500 text-blue-500"><span>Batal</span></button>
      <button className="w-full h-9 rounded-md font-medium bg-blue-500 text-white"><span>Lanjutkan</span></button>
    </div>
  </div>
}