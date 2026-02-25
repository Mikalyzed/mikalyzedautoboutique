export const metadata = {
  title: "Apply for Financing | Mikalyzed Auto Boutique",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <h1 className="text-white text-lg font-light tracking-wide">Credit Application</h1>
        <a href="/" className="text-zinc-400 hover:text-[#dffd6e] text-sm font-light transition">
          Mikalyzed Auto Boutique
        </a>
      </div>
      <iframe
        src="https://dwssecuredforms.dealercenter.net/CreditApplication/index/22887597?themecolor=8C8C8C&formtype=l&frameId=dws_frame_0&standalone=true"
        scrolling="auto"
        style={{ flex: 1, width: "100%", minHeight: "calc(100vh - 57px)" }}
        frameBorder="0"
      />
    </div>
  );
}
