import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-1">
        <Image src="/logo.svg" alt="Linkly" width={140} height={32} />
      </div>
      <div className="flex gap-4">
        <button className="btn btn-ghost">Login</button>
        <button className="btn btn-primary">Register Now</button>
      </div>
    </div>
  );
}
