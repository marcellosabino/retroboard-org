"use client";

import { useEffect, useRef } from "react";
import useBoard from "./components/Board/useBoard";
import { mutate } from "swr";
import RetroBoard from "./components/Board/RetroBoard";

type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  const websocket = useRef<WebSocket | null>(null);
  const boardId = params.id;
  const { board, isLoading, isError } = useBoard(boardId);

  useEffect(() => {
    websocket.current = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/${boardId}`
    );

    return () => {
      websocket.current?.close();
    };
  }, [boardId]);

  useEffect(() => {
    if (websocket.current) {
      websocket.current.onmessage = handleMessage;
    }
  }, [websocket, boardId]);

  /**
   * Handles messages from the server.
   *
   * @param event contains message and data from the server
   */
  function handleMessage(event: MessageEvent): void {
    const { message } = JSON.parse(event.data);

    if (message === "board_refresh") {
      mutate("/api/board");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return <RetroBoard board={board} />;
}
