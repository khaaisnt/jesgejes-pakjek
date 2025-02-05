"use client";

import Modal from "@/components/modal"
import { axiosInstance } from "@/helper/api";
import { getStoresCookie } from "@/helper/client.cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    adminId: number;
};

const DeleteAdmin = () => {
    return (
        <div>
            goaway
        </div>
    )
}

export default DeleteAdmin