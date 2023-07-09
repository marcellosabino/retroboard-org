import { useContext, useState } from "react";
import styles from "./RetroCard.module.scss";
import { WhoAmIContext } from "../../contexts/WhoAmIContext";
import { useAdmin } from "../../contexts/AdminContext";
import { useReadonly } from "../../contexts/ReadonlyContext";
import AddCommentModal from "../../modals/AddCommentModal";
import UpdateCardModal from "../../modals/UpdateCardModal";

type Params = {
  card: any;
  displayColor: string;
};

/**
 * Represents a single card inside of a column on a retroboard.
 *
 * Individuals have the ability to add a card. They also have the ability to
 * update or cards that they create.
 */
export default function RetroCard({ card, displayColor }: Params) {
  const whoAmI = useContext(WhoAmIContext);
  const isReadonly = useReadonly();
  const isAdmin = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  async function deleteCard(): Promise<void> {
    const areYouSure = confirm("Are you sure you want to delete this card?");

    if (areYouSure) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards/${card.id}`, {
        method: "DELETE",
      });
    }
  }

  async function addVote(): Promise<void> {
    if (hasVoted()) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/votes/${getMyVote().id}`,
        {
          method: "DELETE",
        }
      );
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes`, {
        method: "POST",
        body: JSON.stringify({ cardId: card.id, ownerId: whoAmI }),
      });
    }
  }

  async function updateCard(markdown: string): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards/${card.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...card, markdown }),
    });

    setIsModalOpen(false);
  }

  async function addComment(markdown: string): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      body: JSON.stringify({ cardId: card.id, markdown, ownerId: whoAmI }),
    });

    setIsCommentModalOpen(false);
  }

  function displayComments() {
    if (card.comments.length === 0) {
      return <></>;
    }

    return (
      <ul className={styles.comments}>
        {card.comments.map((comment: any) => (
          <li key={comment.id}>{comment.markdown}</li>
        ))}
      </ul>
    );
  }

  function hasVoted(): boolean {
    return !!getMyVote();
  }

  function getMyVote(): any | undefined {
    return card.votes.find((vote: any) => vote.ownerId === whoAmI);
  }

  function showEditAndDeleteIcons() {
    if (isReadonly || (!isAdmin && card.ownerId !== whoAmI)) {
      return <></>;
    }

    return (
      <div className={styles.button_group}>
        <button onClick={() => setIsModalOpen(true)}>
          <i className="bi bi-pencil-square" aria-hidden></i>
        </button>
        <button onClick={deleteCard}>
          <i className="bi bi-trash" aria-hidden></i>
        </button>
      </div>
    );
  }

  return (
    <div
      id={`card_${card.id}`}
      style={{ background: displayColor }}
      className={styles.card}
    >
      <div>{card.markdown}</div>
      {displayComments()}
      <div className={styles.footer}>
        <div className={styles.button_group}>
          <button onClick={addVote}>
            <i
              className={`bi bi-hand-thumbs-up${hasVoted() ? "-fill" : ""}`}
              aria-hidden
            ></i>
            {card.votes.length}
          </button>
          <button onClick={() => setIsCommentModalOpen(true)}>
            <i className="bi bi-chat" aria-hidden></i>
            {card.comments.length}
          </button>
        </div>
        {showEditAndDeleteIcons()}
      </div>
      <UpdateCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={updateCard}
        card={card}
      />
      <AddCommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSubmit={addComment}
        card={card}
      />
    </div>
  );
}
