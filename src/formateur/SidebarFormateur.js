import React, { useState,useContext } from "react";
import Avatar from "@mui/material/Avatar";
import {  AiOutlineHome } from "react-icons/ai";
import NotesIcon from '@mui/icons-material/Notes';
import { Link, NavLink } from "react-router-dom";
import { PrincipalContext } from "../Context";
import DatasetIcon from '@mui/icons-material/Dataset';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ClassIcon from '@mui/icons-material/Class';

const SidebarFormateur = () => {

     const { connected, setConnected } = useContext(PrincipalContext);

  const menus = [
    { name: "Acceuil", link: "/", icon: AiOutlineHome },
    { name: "Dashboard", 
      link: "/formateur/acceuil",
     icon: DatasetIcon },
 
    {
      name: "Formations",
      link: "formations",
      icon: ClassIcon,
    },
   
    {
      name: "Evaluations",
      link: "evaluations",
      icon: AssignmentTurnedInIcon,
    },

 
   
  ];
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-stone-200 min-h-screen ${
          open ? "w-[13rem]" : "w-16"
        } duration-500 fixed px-4`}
      >
        <div
          className={`py-3 ${open && "justify-evenly  p-3"}  flex justify-end`}
        >
          <div
            className={`w-[16] center text-center mx-auto duration-300 ${
              open ? "block" : "hidden"
            }`}
          >
            <Avatar
              sx={{ width: 60, height: 60 }}
              className="mx-auto"
              src={connected.image}
            >
             
            </Avatar>
            <p className="mt-3  font-normal">
              {connected.firstname}
            </p>
          </div>
          <NotesIcon
            sx={{fontSize: 18}}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <hr className={`duration-300 ${open === false && "hidden"}`} />
        <div className="mt-2 p-2 flex flex-col gap-2 relative">
          {menus?.map((menu, i) => (
            <React.Fragment key={i}>
              {menu?.link !== null ? (
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? console.log(" link is pending")
                      : isActive
                      ? ` ${
                          menu?.margin && "mt-5"
                        } group flex items-center text-sm  gap-3.5 font-medium p-1  shadow-md border shadow-green-500 rounded-md`
                      : `${
                          menu?.margin && "mt-5"
                        } group flex items-center text-sm  gap-3.5 font-medium p-1 shadow-slate-400 shadow hover:shadow-md border hover:shadow-blue-500  rounded-md`
                  }
                  to={menu?.link}
                  key={i}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              ) : (
                /* menu?.link == null  */
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? console.log(" link is pending")
                      : isActive === false
                      ? ` ${
                          menu?.margin && "mt-5"
                        } group flex items-center text-sm  gap-3.5 font-medium p-2 bg-green-400 rounded-md`
                      : `${
                          menu?.margin && "mt-5"
                        } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-green-400 rounded-md`
                  }
                  to={menu?.link}
                  key={i}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default  SidebarFormateur