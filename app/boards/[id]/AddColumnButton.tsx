import styles from "./AddColumnButton.module.scss";
import { useAdmin } from "./contexts/AdminContext";

export default function AddColumnButton({ board }: any) {
  const isAdmin = useAdmin();

  async function addColumn(): Promise<void> {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/columns`, {
      method: "POST",
      body: JSON.stringify({
        boardId: board.id,
        displayName: `Column ${board.columns.length + 1}`,
        displayOrder:
          Math.max(
            ...board.columns.map(({ displayOrder }: any) => displayOrder)
          ) + 1,
      }),
    });
  }

  return (
    <button
      id="add_column_btn"
      style={{ display: isAdmin ? "inherit" : "none" }}
      className={styles.add_column_btn}
      onClick={addColumn}
    >
      <i className="bi bi-file-plus" aria-hidden></i>Add Column
    </button>
  );
}
