import Link from 'next/link';
import { MenubarItem } from '../ui/menubar';

export default function MenuLink({
  href,
  label,
  children,
  active,
}: {
  href: string;
  label: string;
  children?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <MenubarItem className="focus:text-primary/70">
      <Link
        href={href}
        className={`flex w-full items-center justify-between space-x-4 ${active ? 'text-blue-600' : ''}`}
      >
        <p>{label}</p>
        {children}
      </Link>
    </MenubarItem>
  );
}
