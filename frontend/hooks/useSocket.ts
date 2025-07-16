"use client";
import { useEffect, useState } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

export const useSocket = ()=>{
    const [socket , setSocket] = useState<WebSocket|null>()
    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        ws.onopen = ()=>{
            setSocket(ws);
        };
        console.log("connection established")
        ws.onclose =()=>{
            setSocket(null)
        }
        return ()=>{
            ws.close()
        }
    },[])
    return socket;
}