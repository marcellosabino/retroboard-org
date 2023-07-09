import { useRef } from "react";
import styles from "./Modal.module.scss";
import useEscapeKey from "@/app/hooks/useEscapeKey";
import useOutsideClick from "@/app/hooks/useOutsideClick";

type Params = {
  isOpen: boolean;
  headerText: string;
  handleClose: () => void;
  handleSubmit?: () => void;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  headerText,
  handleClose,
  handleSubmit,
  children,
}: Params) {
  const modalRef = useRef(null);

  useEscapeKey(handleClose);
  useOutsideClick(modalRef, handleClose);

  function displayFooter(): JSX.Element {
    if (!handleSubmit) {
      return <></>;
    }

    return (
      <div className={styles.footer}>
        <button className={styles.primary} onClick={handleSubmit}>
          Submit
        </button>
        <button className={styles.link} onClick={handleClose}>
          Cancel
        </button>
      </div>
    );
  }

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={styles.backdrop}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <h1>{headerText}</h1>
          <button onClick={handleClose}>
            <i className="bi bi-x-lg" aria-hidden></i>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {displayFooter()}
      </div>
    </div>
  );
}
