import { useConfirmModal } from "@/store/confirmModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function ConfirmModal() {
  const store = useConfirmModal();

  if (!store.isOpen) return;

  const handleCancelClick = () => {
    if (store.onNegative) store.onNegative();

    store.actions.close();
  };

  const handleActionClick = () => {
    if (store.onPositive) store.onPositive();

    store.actions.close();
  };

  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogContent className="z-999 w-93.75 max-w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription>{store.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleActionClick}
            className="cursor-pointer"
          >
            확인
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={handleCancelClick}
            className="cursor-pointer"
          >
            취소
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
