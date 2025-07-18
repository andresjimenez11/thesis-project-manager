'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, HomeIcon, House, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import Home from '@/app/page';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';

const Sidebar = () => {
    const [ showProjects, setShowProjects ] = useState(true);
    const [ showPriority, setShowPriority] = useState(true);

    const { data: projects } = useGetProjectsQuery();
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed,
    );

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
      ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
    `;
    return (
        <div className={sidebarClassNames}>
            <div className='flex h-[100%] w-full flex-col justify-start'>
                {/* Top logo */}
                <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
                    <div className='text-xl font-bold text-gray-800 dark:text-white'>
                        MENÚ
                    </div>
                    {isSidebarCollapsed ? null :(
                      <button
                        className="py-3"
                        onClick={() => {
                        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
                        }}
                        >
                          <X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white'/>
                      </button>
                    )}
                </div>
                {/* Team */}
                <div className='flex items-center gap-3 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                    <Image src='/logo_tesis1.png' alt='Logo' width={90} height={50} className='block dark:hidden'/>
                    <Image src={'/logo_tesis1_dark.png'} alt='Logo' width={90} height={50} className='hidden dark:block'/>
                    <div>
                        <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>
                            Tesis de Colombia
                        </h3>
                        <div className='mt-1 flex items-start gap-2'>
                            <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400'/>
                            <p className='text-xs text-gray-500'>Privado</p>
                        </div>
                    </div>
                </div>
                {/* Navbar Links */}
                <nav className='z-10 w-full'>
                    <SidebarLink icon={House} label='Inicio' href='/'/>
                    <SidebarLink icon={Briefcase} label='Linea de tiempo' href='/timeline'/>
                    <SidebarLink icon={Search} label='Buscar' href='/search'/>
                    <SidebarLink icon={Settings} label='Configuración' href='/settings'/>
                    <SidebarLink icon={User} label='Usuarios' href='/users'/>
                    <SidebarLink icon={Users} label='Equipos' href='/teams'/>
                </nav>

                {/* PROJECTS LINKS */}
                <button
                  onClick={() => setShowProjects((prev) => !prev)}
                  className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
                >
                  <span className="">Proyectos</span>
                  {showProjects ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                
                {/* PROJECTS LIST */}
                {showProjects &&
                  projects?.map((project) => (
                    <SidebarLink
                      key={project.id}
                      icon={Briefcase}
                      label={project.name}
                      href={`/projects/${project.id}`}
                    />
                  ))}

                {/* PRIORITIES LINKS */}
                <button
                  onClick={() => setShowPriority((prev) => !prev)}
                  className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
                >
                  <span className="">Prioridad</span>
                  {showPriority ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {showPriority && (
                  <>
                    <SidebarLink
                      icon={AlertCircle}
                      label="Urgente"
                      href="/priority/urgent"
                    />
                    <SidebarLink
                      icon={ShieldAlert}
                      label="Alto"
                      href="/priority/high"
                    />
                    <SidebarLink
                      icon={AlertTriangle}
                      label="Medio"
                      href="/priority/medium"
                    />
                    <SidebarLink 
                      icon={AlertOctagon} 
                      label="Bajo" 
                      href="/priority/low" />
                    <SidebarLink
                      icon={Layers3}
                      label="Reserva"
                      href="/priority/backlog"
                    />
                  </>
                )}

            </div>
        </div>
    );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};
export default Sidebar