import { Modal } from "@/components/ui/Modal";
import { CourseMissionTree } from "./CourseMissionTree";
import type { MissionCourseTree } from "@/types/missions";

export function MissionTreeModal({
  open,
  onClose,
  tree,
}: {
  open: boolean;
  onClose: () => void;
  tree: MissionCourseTree;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow="Mappa del corso"
      title={tree.courseName}
    >
      <CourseMissionTree tree={tree} />
    </Modal>
  );
}
