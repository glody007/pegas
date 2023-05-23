import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Subtitle, Icon } from "@tremor/react";
import Link from 'next/link';
import logo from '../../images/logo.png';
import {
  HomeIcon,
  BookOpenIcon,
  TicketIcon,
  CalendarIcon,
  TruckIcon,
  ViewListIcon,
  ClockIcon,
  ArchiveIcon,
  MinusIcon,
  OfficeBuildingIcon,
  TableIcon,
  MapIcon,
  DesktopComputerIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  UserIcon,
  CalculatorIcon,
  TrendingUpIcon
} from "@heroicons/react/outline";

const items = [
  {
    name: 'Ticket Sell',
    link: '/counter',
    icon: TicketIcon
  },
  {
    name: 'Ticket Book',
    link: '/counter/book',
    icon: ArchiveIcon
  },
  {
    name: 'Tickets',
    link: '/counter/tickets',
    icon: ViewListIcon
  },
  {
    name: 'Manifest and departure',
    link: '/counter/manifest',
    icon: CalendarIcon
  },
  {
    name: 'Fleet and staff',
    link: '/counter/fleet',
    icon: TruckIcon
  },
  {
    name: 'Income',
    link: '/counter/income',
    icon: CurrencyDollarIcon
  },
  {
    name: 'User dashboard',
    link: '/counter/user',
    icon: UserIcon
  },
  {
    name: 'Sales reports',
    link: '/counter/report',
    icon: TrendingUpIcon
  },
  {
    name: 'Transactions',
    link: '/counter/transactions',
    icon: BookOpenIcon
  },
]

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { pathname } = location;
  const [currentPathName, setCurrentPathName] = useState(pathname)

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const isSelected = (path: String) => path === currentPathName

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute p-4 left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-scroll bg-slate-900 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* NAV BAR HEADER */}
      <div className="flex items-center space-x-2">
        <Image 
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-sm"
        />
        <h2 className="text-3xl text-white">COUNTER</h2>
      </div>

      {/* NAV BAR BODY */}
      <div className="mt-8">
        <Subtitle>Menu</Subtitle>
        <ul className="space-y-2 mt-4 -ml-2">
          {items.map(item => (
            <Link href={item.link}>
              <li 
                key={item.name} 
                onClick={() => setCurrentPathName(item.link)}
                className={`flex items-center text-sm text-white rounded ${isSelected(item.link) ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <Icon 
                  color="gray"
                  size="md" 
                  icon={item.icon} 
                />
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
