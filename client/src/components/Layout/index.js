import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

export default function Layout() {
    return (
        <div className="container mx-auto flex flex-wrap relative bg-[#202060] pt-5 md:pt-16">
            <SideMenu />
            <div className="flex-auto basis-1/2  rounded-t-3xl bg-white md:rounded-tr-none p-3 ">
                <Outlet className/>
            </div>
        </div>
    );
}