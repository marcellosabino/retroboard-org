"use client";

import { useState } from "react";
import styles from "./CreateBoard.module.scss";
import Spinner from "./components/Spinner";
import { useRouter } from "next/navigation";
import { RetroBoard } from "./models";
import useWhoAmI from "./hooks/useWhoAmI";

export default function CreateBoard() {
  const MINIMUM_BOARD_NAME_LENGTH = 3;
  const router = useRouter();
  const whoAmI = useWhoAmI();
  const [isCreateDisabled, setIsCreateDisabled] = useState(true);
  const [isGeneratingBoard, setIsGeneratingBoard] = useState(false);

  function handleBoardNameChange(boardName: string): void {
    setIsCreateDisabled(boardName.length <= MINIMUM_BOARD_NAME_LENGTH);
  }

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();

    // Send to GA
    gtag("event", "create_board", {
      event_category: "button_click",
      event_label: "Create Board",
      value: event.target.board_name.value,
    });

    setIsGeneratingBoard(true);

    const data = {
      displayName: event.target.board_name.value,
      preset: "default" as "default",
      ownerId: whoAmI,
    };

    const board = await createBoard(data);
    await createColumns(board);

    router.push(`/boards/${board.id}`);
  }

  async function createBoard(
    boardData: Partial<RetroBoard>
  ): Promise<RetroBoard> {
    const options = { method: "POST", body: JSON.stringify(boardData) };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards`,
      options
    );
    return response.json();
  }

  async function createColumns(board: RetroBoard): Promise<void> {
    const columns = [
      {
        boardId: board.id,
        displayName: "What Went Well",
        displayOrder: 0,
        displayColor: "#d2f0b9",
      },
      {
        boardId: board.id,
        displayName: "What Didn't Go Well",
        displayOrder: 1,
        displayColor: "#f6daea",
      },
      {
        boardId: board.id,
        displayName: "Action Items",
        displayOrder: 3,
        displayColor: "#e5daf7",
      },
    ];

    const requests = columns.map((column) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/columns`, {
        method: "POST",
        body: JSON.stringify(column),
      })
    );

    await Promise.all(requests);
  }

  function getSubmitButtonDisplayContents() {
    if (isGeneratingBoard) {
      return <Spinner loadingText="Generating..." />;
    }

    return (
      <>
        <span className="hidden md:inline">Create Board</span>
        <span className="inline md:hidden">Create</span>
      </>
    );
  }

  return (
    <div id="create_board" className={styles.create_board}>
      <h1>Create a Retro Board</h1>
      <span>Create your retro board for free &mdash; no account needed.</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="board_name" className="sr-only">
          Board Name
        </label>
        <input
          id="board_name"
          name="board_name"
          type="text"
          placeholder="Enter a name..."
          autoFocus={true}
          autoComplete="off"
          required
          onChange={(e) => handleBoardNameChange(e.target.value)}
        />
        <button type="submit" disabled={isCreateDisabled || isGeneratingBoard}>
          {getSubmitButtonDisplayContents()}
        </button>
      </form>
      <div id="tos" className={styles.terms_of_service}>
        By creating a board you accept our{" "}
        <a href="https://github.com/marcellosabino/retroboard-org/TERMS.md">
          terms
        </a>{" "}
        and{" "}
        <a href="https://github.com/marcellosabino/retroboard-org/PRIVACY.md">
          privacy policy
        </a>
        .
      </div>
    </div>
  );
}
