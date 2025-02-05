"use client"

import Modal from "@/components/modal";
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Employee } from "../types"

type props = {
    admin: Employee;
}

const EditAdmin = () => {
    return (
        <div>
            goaway
        </div>
    )
}

export default EditAdmin