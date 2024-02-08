import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarFormateur';
import SidebarFormateur from './SidebarFormateur';

export default function DashboardFormateur() {
  return (
    <div className='h-[100vh] bg-slate-50 flex'>
      <div className="flex-none w-52">
        {" "}
        <SidebarFormateur />
      </div>
      <div className="grow bg-violet-100 min-h-[88vh]"> 
        <Outlet />
      </div>
    </div>
  );
}
