import Modal from "@/app/components/Modal/Modal";
import useWhoAmI from "@/app/hooks/useWhoAmI";
import { useState } from "react";

type Params = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: any) => void;
  column: any;
};

export default function AddCardModal({
  isOpen,
  onClose,
  onSubmit,
  column,
}: Params) {
  const [card, setCard] = useState({});
  const whoAmI = useWhoAmI();

  return (
    <Modal
      headerText="Add Card"
      isOpen={isOpen}
      handleClose={onClose}
      handleSubmit={() => onSubmit(card)}
    >
      <textarea
        autoFocus={true}
        autoComplete="off"
        placeholder="Enter some feedback..."
        onChange={(e) =>
          setCard((value) => ({
            ...value,
            columnId: column.id,
            ownerId: whoAmI,
            markdown: e.target.value,
          }))
        }
      ></textarea>
    </Modal>
  );
}
