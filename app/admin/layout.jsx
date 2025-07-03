import Sidebar from "@/Components/AdminComponent/Sidebar";

export default function Layout({children}){
    return(
        <>
            <div className="flex">
                <Sidebar />
            </div>
            {children}
        </>
    )
}