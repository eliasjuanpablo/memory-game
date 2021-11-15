import { CellStatus, ICell } from "../types";
import "./Cell.css";

type CellProps = ICell & { onClick: Function };

export default function Cell(props: CellProps) {
  const { value, onClick, status } = props;
  let style: React.CSSProperties = {};
  if (status === CellStatus.Selected) {
    style.background = "#fea112";
  }
  if (status === CellStatus.Revealed) {
    style.background = "#bbceda";
  }

  const isVisible = [CellStatus.Revealed, CellStatus.Selected].includes(status);
  return (
    <div
      className="cell"
      onClick={() => {
        onClick();
      }}
      style={style}
    >
      {isVisible && value}
    </div>
  );
}
