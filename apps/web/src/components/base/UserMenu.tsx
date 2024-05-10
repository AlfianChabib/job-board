import { userMenuLinks } from '@/lib/constants';
import { Menubar, MenubarContent, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '../ui/menubar';
import { useCurrentSession } from '../providers/session-provider';
import AvatarProfile from '../elements/AvatarProfile';
import Link from 'next/link';
import Logout from '../auth/logout';
import { usePathname } from 'next/navigation';
import { icons } from 'lucide-react';
import MenuLink from '../elements/MenuLink';
import Icon from '../elements/icon';

export default function CompanyMenu() {
  const session = useCurrentSession();
  const pathname = usePathname();

  if (!session) return null;

  return (
    <Menubar className="bg-transparent border-transparent">
      <MenubarMenu>
        <MenubarTrigger className="data-[state=open]:bg-background data-[state=closed]:bg-transparent">
          <AvatarProfile url={session?.image} name={session?.username} />
        </MenubarTrigger>
        <MenubarContent className="bg-none min-w-[250px] font-medium text-gray-800" align="end">
          {userMenuLinks.map((link, index) => {
            const icon = link.icon as keyof typeof icons;
            return (
              <div key={index} className="flex flex-col space-y-1 py-1 text-primary">
                <MenuLink href={link.href} label={link.name}>
                  <Icon name={icon} size={20} />
                </MenuLink>
              </div>
            );
          })}
          <MenubarSeparator />
          <Logout />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
