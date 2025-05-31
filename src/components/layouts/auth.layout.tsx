interface Props {
  children: React.ReactNode;
}
export default function UserAuthLayout({ children }: Props) {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden">
      <div className="rounded-full hidden sm:block absolute  w-[300px] h-[300px] bg-slate-300 -top-20 -left-20" />
      <div className="rounded-full hidden sm:block absolute  w-[300px] h-[300px] bg-slate-300 -top-20 -right-20" />

      <div className="rounded-full hidden sm:block absolute  w-[300px] h-[300px] bg-slate-300 -bottom-20 -left-20" />

      <div className="rounded-full hidden sm:block absolute  w-[300px] h-[300px] bg-slate-300 -bottom-20 -right-20" />

      <div className="flex w-full p-5 max-w-xs flex-col items-center gap-y-4 bg-primary shadow-lg rounded-xl">
        {children}
      </div>
    </div>
  );
}
