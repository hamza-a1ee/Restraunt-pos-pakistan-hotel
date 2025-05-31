interface Props {
  message: string;
}
export default function NoResultMessage({ message }: Props) {
  return (
    <div className="w-full p-20 flex items-center justify-center text-sm text-slate-400">
      {message}
    </div>
  );
}
