import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Subtitle, Icon } from "@tremor/react";
import Link from 'next/link';
import logo from '../../images/logo.png';
import {
  HomeIcon,
  BookOpenIcon,
  TicketIcon,
  TruckIcon,
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
import { MapPinIcon } from 'lucide-react';

const items = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Fleet',
    link: '/dashboard/fleet',
    icon: TruckIcon
  },
  {
    name: 'Fleet tracking',
    link: '/dashboard/fleet-tracking',
    icon: MapPinIcon
  },
  {
    name: 'Schedule',
    link: '/dashboard/schedule',
    icon: ClockIcon
  },
  {
    name: 'User',
    link: '/dashboard/user',
    icon: UserIcon
  },
  {
    name: 'Departure',
    link: '/dashboard/departure',
    icon: OfficeBuildingIcon
  },
  {
    name: 'Counter',
    link: '/dashboard/counter',
    icon: DesktopComputerIcon,
  },
  {
    name: 'Route',
    link: '/dashboard/route',
    icon: MapIcon
  },
  {
    name: 'Dynamic Seat Plan Maker',
    link: '/dashboard/seat-plan-maker',
    icon: TableIcon
  },
  {
    name: 'Ticket price',
    link: '/dashboard/ticket-price',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Ticket details by PNR',
    link: '/dashboard/ticket-details',
    icon: TicketIcon
  },
  {
    name: 'Ticket cancel request',
    link: '/dashboard/ticket-cancel',
    icon: ArchiveIcon
  },
  {
    name: 'Reservation',
    link: '/dashboard/reservation',
    icon: CreditCardIcon
  },
  {
    name: 'Discount',
    link: '/dashboard/discount',
    icon: MinusIcon
  },
  {
    name: 'Sales Dashboard',
    link: '/dashboard/sales-dashboard',
    icon: CalculatorIcon
  },
  {
    name: 'Report',
    link: '/dashboard/report',
    icon: TrendingUpIcon
  },
  {
    name: 'Transactions',
    link: '/dashboard/transactions',
    icon: BookOpenIcon
  }
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
      className={`absolute pt-4 left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-scroll no-scrollbar bg-slate-900 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* NAV BAR HEADER */}
      <div className="flex items-center justify-center space-x-2 mx-4">
        <Image 
          src={logo}
          alt="Logo"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h2 className="text-3xl text-white"></h2>
      </div>

      {/* NAV BAR BODY */}
      <div className="mt-4">
        <ul className="mt-4">
          {items.map(item => (
            <Link href={item.link}>
              <li 
                key={item.name} 
                onClick={() => setCurrentPathName(item.link)}
                className={`relative flex items-center text-sm px-4 py-1 ${isSelected(item.link) ? 'bg-white rounded-l-full text-gray-600' : 'hover:bg-slate-500 z-50 text-white'}`}
              >
                <Icon 
                  color={isSelected(item.link) ? 'gray' : 'white'}
                  size="md" 
                  className='-ml-2'
                  icon={item.icon} 
                />
                {item.name}
                {isSelected(item.link) && (
                  <>
                    <div className='absolute right-0 -top-8 w-8 h-8 bg-white' />
                    <div className='absolute right-0 -top-8 w-8 h-8 bg-slate-900 rounded-br-full' />
                    <div className='absolute right-0 -bottom-8 w-8 h-8 bg-white' />
                    <div className='absolute right-0 -bottom-8 w-8 h-8 bg-slate-900 rounded-tr-full' />
                  </>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
