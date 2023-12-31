import Modal from "@/app/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Params = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: any) => void;
  board: any;
};

export default function BoardSettingsModal({
  isOpen,
  onClose,
  onSubmit,
  board,
}: Params) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(board.displayName);

  async function deleteBoard(): Promise<void> {
    const areYouSure = confirm("Are you sure you wish to delete this board?");

    if (areYouSure) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${board.id}`, {
        method: "DELETE",
      });

      router.push("/");
    }
  }

  return (
    <Modal
      headerText="Board Settings"
      isOpen={isOpen}
      handleClose={onClose}
      handleSubmit={() => onSubmit({ ...board, displayName })}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor={`${board.id}_board_modal`}
            className="block mb-2 font-bold text-sm"
          >
            Display name:
          </label>
          <input
            id={`${board.id}_preferences_modal`}
            className="w-full p-2 rounded-lg"
            autoComplete="off"
            defaultValue={board.displayName}
            type="text"
            placeholder="Enter a display name..."
            onChange={(e: any) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 border-2 border-red-300 border-dashed bg-red-50 p-5 rounded-lg">
          <div>
            <h3 className="text-lg font-extrabold text-red-800">Danger Zone</h3>
            <span className="text-sm">
              You will lose this board and all of it&apos;s data. You will also
              not be able to get this board back.
            </span>
          </div>
          <div>
            <button
              onClick={deleteBoard}
              className="text-sm bg-red-800 text-white font-semibold px-2 py-1 rounded-lg hover:bg-red-900"
            >
              Delete Board
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
