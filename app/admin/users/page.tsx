"use client";

import { useEffect } from "react";

export default function AdminUsersPage(){

    useEffect(() => {
        const user = localStorage.getItem("user");

        if(!user){
            window.location.href = "/login";

            return;
        }

        const parsedUser = JSON.parse(user);

        if(parsedUser.role !== "admin"){
            window.location.href = "/dashboard";
        }
        
    }, []);
    
    return (
        <div className="p-5">

            <h1 className="text-2xl font-bold">
                CRUD User Admin
            </h1>

        </div>
    );
}