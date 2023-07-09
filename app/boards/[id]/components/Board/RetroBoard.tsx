import { useEffect, useMemo, useState } from "react";
import styles from "./RetroBoard.module.scss";
import useWhoAmI from "@/app/hooks/useWhoAmI";
import AddColumnButton from "./AddColumnButton";
import BoardProviders from "../../contexts/BoardProviders";
import BoardPreferencesModal from "../../modals/BoardPreferencesModal";
import BoardSettingsModal from "../../modals/BoardSettingsModal";
import RetroColumn from "../Column/RetroColumn";

type Params = {
  board: any;
};

/**
 * Represents a retroboard.
 */
export default function RetroBoard({ board }: Params) {
  const orderedColumns = useMemo<any[]>(() => {
    return board.columns.sort(
      (a: any, b: any) => a.displayOrder - b.displayOrder
    );
  }, [board.columns]);
  const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false);
  const [isBoardPreferencesOpen, setIsBoardPreferencesOpen] = useState(false);
  const whoAmI = useWhoAmI();

  useEffect(() => {
    const previousBoards = localStorage.getItem("previous_boards");
    const currentBoard = {
      id: board.id,
      name: board.displayName,
      createdAt: board.createdAt.toString(),
    };

    if (previousBoards === null) {
      localStorage.setItem(
        "previous_boards",
        JSON.stringify({ [currentBoard.id]: currentBoard })
      );
    } else {
      localStorage.setItem(
        "previous_boards",
        JSON.stringify({
          ...(JSON.parse(previousBoards) as any),
          [currentBoard.id]: currentBoard,
        })
      );
    }
  }, [board]);

  async function updateBoard(board: any): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${board.id}`, {
      method: "PUT",
      body: JSON.stringify(board),
    });
    setIsBoardSettingsOpen(false);
  }

  function showBoardSettings() {
    if (whoAmI === board.ownerId) {
      return (
        <button
          className="hover:bg-gray-200 px-2 py-1 rounded-full"
          onClick={() => setIsBoardSettingsOpen(true)}
        >
          <i className="bi bi-gear text-xl"></i>
        </button>
      );
    }

    return <></>;
  }

  return (
    <div id={`retroboard_${board.id}`} className={styles.board_container}>
      <BoardProviders isBoardOwner={board.ownerId === whoAmI}>
        <div className={styles.header}>
          <h1 title={board.displayName}>{board.displayName}</h1>
          <div className={styles.action_buttons}>
            {showBoardSettings()}
            <button
              className={`hover:bg-gray-200 ${
                whoAmI === board.ownerId ? "px-2.5" : "px-1.5"
              } rounded-full py-0.5`}
              onClick={() => setIsBoardPreferencesOpen(true)}
            >
              <i className="bi bi-three-dots-vertical text-base"></i>
            </button>
          </div>
        </div>
        <div className={styles.board}>
          {orderedColumns.map((column: any) => (
            <RetroColumn key={column.id} column={column} />
          ))}
          <AddColumnButton board={board} />
        </div>
        <BoardSettingsModal
          isOpen={isBoardSettingsOpen}
          onClose={() => setIsBoardSettingsOpen(false)}
          onSubmit={updateBoard}
          board={board}
        />
        <BoardPreferencesModal
          isOpen={isBoardPreferencesOpen}
          onClose={() => setIsBoardPreferencesOpen(false)}
          board={board}
        />
      </BoardProviders>
    </div>
  );
}
