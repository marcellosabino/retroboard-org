import Modal from "@/app/components/Modal";
import { useState } from "react";

type Params = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: any) => void;
  card: any;
};

export default function UpdateCardModal({
  isOpen,
  onClose,
  onSubmit,
  card,
}: Params) {
  const [markdown, setMarkdown] = useState(card.markdown);

  return (
    <Modal
      headerText="Update Card"
      isOpen={isOpen}
      handleClose={onClose}
      handleSubmit={() => onSubmit(markdown)}
    >
      <textarea
        autoFocus={false}
        autoComplete="off"
        placeholder="Enter some feedback..."
        defaultValue={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      ></textarea>
    </Modal>
  );
}
