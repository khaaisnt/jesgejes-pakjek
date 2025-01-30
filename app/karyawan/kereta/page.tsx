import { axiosInstance } from "@/helper/api";
import { KeretaType } from "./types";
import { getServerCookie } from "@/helper/server-cookie";
import {GetServerSideProps} from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";

const getKereta = 
    async (): Promise<KeretaType[]> => {
        try {
            // get token from cookie
            const token = await getServerCookie(`token`);
            const url = `/train`;
            // hit endpoint
            const response: any = 
                await axiosInstance
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if(response.data.success == true) {
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

export const getServerSideProps: GetServerSideProps = async () => {
    const dataKereta = await getKereta();
    return {
        props: {
            dataKereta
        }
    }
}