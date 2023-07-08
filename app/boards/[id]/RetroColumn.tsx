import styles from "./RetroColumn.module.scss";
import RetroCard from "./RetroCard";
import AddCardModal from "./modals/AddCardModal";
import { useMemo, useState } from "react";
import ColumnSettingsModal from "./modals/ColumnSettingsModal";
import { useSortBy } from "./contexts/SortByContext";
import { useAdmin } from "./contexts/AdminContext";

type Params = {
  column: any;
};

/**
 * Represents a column on a retroboard.
 *
 * Columns can be added, updated, or deleted by the board's owner. These represent
 * categories that your team can go over during a retrospective session.
 */
export default function RetroColumn({ column }: Params) {
  const sortDetails = useSortBy();
  const [isOpen, setIsOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const isAdmin = useAdmin();

  const sortCards = useMemo(() => {
    return column.cards.sort(sortDetails.sortBy);
  }, [column.cards, sortDetails]);

  function handleAddCard(): void {
    setIsOpen(true);
  }

  function handleClose(): void {
    setIsOpen(false);
  }

  function closePreferences(): void {
    setIsPreferencesOpen(false);
  }

  function openPreferences(): void {
    setIsPreferencesOpen(true);
  }

  async function updatePreferences(updatedColumn: any): Promise<void> {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/columns/${updatedColumn.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedColumn),
      }
    );
    closePreferences();
  }

  async function handleSubmit(card: any): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`, {
      method: "POST",
      body: JSON.stringify(card),
    });

    setIsOpen(false);
  }

  function getTotalNumberOfVotes(): number {
    return column.cards.reduce((accumulated: number, current: any) => {
      return current.votes.length + accumulated;
    }, 0);
  }

  return (
    <div id={`column_${column.id}`} className={styles.column}>
      <div className={styles.header}>
        <h2 title={column.displayName}>{column.displayName}</h2>
        <div className={styles.action_buttons}>
          <button onClick={handleAddCard}>Add Card</button>
          <button
            style={{ display: isAdmin ? "inherit" : "none" }}
            onClick={openPreferences}
          >
            <i className="bi bi-gear" aria-hidden></i>
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {sortCards.map((card: any) => (
          <RetroCard
            key={card.id}
            card={card}
            displayColor={column.displayColor}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <div>Total Votes: {getTotalNumberOfVotes()}</div>
        <div></div>
      </div>
      <AddCardModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        column={column}
      />
      <ColumnSettingsModal
        isOpen={isPreferencesOpen}
        onClose={closePreferences}
        onSubmit={updatePreferences}
        column={column}
      />
    </div>
  );
}
