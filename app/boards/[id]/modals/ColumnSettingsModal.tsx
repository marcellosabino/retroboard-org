import ColorPicker from "@/app/components/ColorPicker";
import Modal from "@/app/components/Modal";
import { useState } from "react";

type Params = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (card: any) => void;
  column: any;
};

export default function ColumnSettingsModal({
  isOpen,
  onClose,
  onSubmit,
  column,
}: Params) {
  const [displayName, setDisplayName] = useState(column.displayName);
  const [displayColor, setDisplayColor] = useState(column.displayColor);

  function onColorChange(color: string) {
    setDisplayColor(color);
  }

  async function deleteColumn(): Promise<void> {
    const areYouSure = confirm("Are you sure you wish to delete this column?");

    if (areYouSure) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/columns/${column.id}`, {
        method: "DELETE",
      });

      onClose();
    }
  }

  return (
    <Modal
      headerText="Column Settings"
      isOpen={isOpen}
      handleClose={onClose}
      handleSubmit={() => onSubmit({ ...column, displayName, displayColor })}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor={`${column.id}_settings_modal`}
            className="block mb-2 font-bold text-sm"
          >
            Display name:
          </label>
          <input
            id={`${column.id}_preferences_modal`}
            className="w-full p-2 rounded-lg"
            autoComplete="off"
            defaultValue={column.displayName}
            type="text"
            placeholder="Enter a display name..."
            onChange={(e: any) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-sm">Display color</label>
          <ColorPicker
            selected={column.displayColor}
            onChange={onColorChange}
          />
        </div>
        <div className="flex flex-col gap-3 border-2 border-red-300 border-dashed bg-red-50 p-5 rounded-lg">
          <div>
            <h3 className="text-lg font-extrabold text-red-800">Danger Zone</h3>
            <span className="text-sm">
              You will lose this column and all of it&apos;s data. You will also
              not be able to get this column back.
            </span>
          </div>
          <div>
            <button
              onClick={deleteColumn}
              className="text-sm bg-red-800 text-white font-semibold px-2 py-1 rounded-lg hover:bg-red-900"
            >
              Delete Column
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
