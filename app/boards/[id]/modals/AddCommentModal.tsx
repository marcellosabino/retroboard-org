import Modal from "@/app/components/Modal/Modal";
import { useState } from "react";

type Params = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: any) => void;
  card: any;
};

export default function AddCommentModal({
  isOpen,
  onClose,
  onSubmit,
  card,
}: Params) {
  const [markdown, setMarkdown] = useState(card.markdown);

  return (
    <Modal
      headerText="Add Comment"
      isOpen={isOpen}
      handleClose={onClose}
      handleSubmit={() => onSubmit(markdown)}
    >
      <textarea
        autoFocus={true}
        autoComplete="off"
        placeholder="Enter your comment..."
        onChange={(e) => setMarkdown(e.target.value)}
      ></textarea>
    </Modal>
  );
}
