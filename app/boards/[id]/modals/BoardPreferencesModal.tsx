import Modal from "@/app/components/Modal";
import Toggler from "@/app/components/Toggler";
import { useSortBy, useSortByDispatch } from "../contexts/SortByContext";
import { useReadonly, useReadonlyDispatch } from "../contexts/ReadonlyContext";
import { useAdmin, useAdminDispatch } from "../contexts/AdminContext";
import useWhoAmI from "@/app/hooks/useWhoAmI";

type Params = {
  isOpen: boolean;
  onClose: () => void;
  board: any;
};

export default function BoardPreferencesModal({
  isOpen,
  onClose,
  board,
}: Params) {
  const whoAmI = useWhoAmI();
  const sortDetails = useSortBy();
  const dispatch = useSortByDispatch();
  const isReadonly = useReadonly();
  const readonlyDispatch = useReadonlyDispatch();
  const isAdmin = useAdmin();
  const adminDispatch = useAdminDispatch();

  function displayAdminToggle() {
    if (whoAmI === board.ownerId) {
      return (
        <div>
          <label
            htmlFor={`${board.id}_board_modal`}
            className="block mb-2 font-bold text-sm"
          >
            Administrative Mode:
          </label>
          <Toggler isChecked={isAdmin} onToggle={(v) => adminDispatch(v)} />
        </div>
      );
    }
    return <></>;
  }

  return (
    <Modal headerText="Board Preferences" isOpen={isOpen} handleClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor={`${board.id}_board_modal`}
            className="block mb-2 font-bold text-sm"
          >
            Sort By Votes:
          </label>
          <Toggler
            isChecked={sortDetails.name === "votes"}
            onToggle={(isToggled) => {
              if (isToggled) {
                dispatch({ type: "votes" });
              } else {
                dispatch({ type: "chronological" });
              }
            }}
          />
        </div>
        {displayAdminToggle()}
        <div>
          <label
            htmlFor={`${board.id}_board_modal`}
            className="block mb-2 font-bold text-sm"
          >
            Readonly Cards:
          </label>
          <Toggler
            isChecked={isReadonly}
            onToggle={(v) => readonlyDispatch(v)}
          />
        </div>
      </div>
    </Modal>
  );
}
