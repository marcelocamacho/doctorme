import Link from "next/link";
import { Icon, IconName } from "./icon";
import { ReactNode } from "react";

export function Header(
    {title, href, children,iconName,iconClassName}: Readonly<{
        title?: string;href:string; children?: React.ReactNode;iconName?: IconName;
        iconClassName?:string;
    }>){
        const classNameDefault = "flex w-full gap-5 items-center";
    return(
        <div className={`${classNameDefault} ${children ? 'justify-between' : null}`}>
            {children ? <> {children} </> : null}
            <Link href={href} 
                className="h-10 w-10 flex items-center justify-center border border-[#f4f4f4] rounded-full hover:bg-slate-200 transition-all">
                <Icon name={iconName ?? 'arrow-left'} className={`text-[#242424] ${iconClassName}`} />
            </Link>
           {!children ? <div className="text-xl font-semibold">{title}</div> : null} 
        </div>
        
    );
}