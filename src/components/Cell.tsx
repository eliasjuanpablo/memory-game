import { CellStatus, ICell } from "../types";

type CellProps = ICell & { onClick: Function };

export default function Cell(props: CellProps) {
  const { value, onClick, status } = props;

  const isVisible = [CellStatus.Revealed, CellStatus.Selected].includes(status);
  return (
    <div
      className="cell"
      onClick={() => {
        onClick();
      }}
    >
      {isVisible ? value : "X"} - {status.toString()}
    </div>
  );
}
