export default function SectionSkeleton() {
  return (
    <div className="w-full h-full py-20 px-4 md:px-8 flex flex-col items-center justify-center animate-pulse bg-slate-50">
      <div className="w-32 h-6 md:h-8 bg-slate-200 rounded-full mb-6"></div>
      <div className="w-3/4 md:w-1/2 h-8 md:h-12 bg-slate-200 rounded-xl mb-4"></div>
      <div className="w-1/2 md:w-1/3 h-6 md:h-8 bg-slate-200 rounded-xl mb-12"></div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-48 md:h-64 bg-slate-200 rounded-2xl w-full"></div>
        <div className="h-48 md:h-64 bg-slate-200 rounded-2xl w-full"></div>
        <div className="h-48 md:h-64 bg-slate-200 rounded-2xl w-full"></div>
      </div>
    </div>
  );
}
