'use client'

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

export interface FWSProviderProps {
  children: ReactNode
}

type WSStatus = 'connecting' | 'open' | 'closed' | 'error'

export interface FWSProps {
  status: WSStatus
  messages: string[]
  sendMessage: (message: string) => void
}

const FWSContext = createContext<FWSProps | undefined>(undefined)

export const FWSProvider = ({ children }: FWSProviderProps) => {
  const [messages, setMessages] = useState<string[]>([])
  const [status, setStatus] = useState<WSStatus>('closed')
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('wss://gspacez.tech/api/v1/profile-service/ws')

    setStatus('connecting')

    ws.onopen = () => {
      console.log('WS connected')
      setStatus('open')
    }

    ws.onmessage = (event) => {
      console.log('Received data: ', event.data)
      setMessages((prev) => [...prev, event.data])
    }

    ws.onclose = () => {
      console.log('WS closed')
      setStatus('closed')
    }

    ws.onerror = () => {
      console.error('WS error!')
      setStatus('error')
    }

    socketRef.current = ws

    return () => {
      ws.close()
    }
  }, [])

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message))
    } else {
      console.error('WebSocket is not open')
    }
  }

  return (
    <FWSContext.Provider value={{ messages, sendMessage, status }}>{children}</FWSContext.Provider>
  )
}

export const useFWS = () => {
  const context = useContext(FWSContext)
  if (!context) {
    throw new Error('WebSocket should be used inside FWSProvider')
  }
  return context
}
