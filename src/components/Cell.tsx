import styled from "styled-components";
import { CellStatus, ICell } from "../types";

type CellProps = ICell & { onClick: Function };

export default function Cell(props: CellProps) {
  const { value, onClick, status } = props;

  const isVisible = [CellStatus.Revealed, CellStatus.Selected].includes(status);
  return (
    <Wrapper
      onClick={() => {
        onClick();
      }}
      status={status}
    >
      {isVisible && value}
    </Wrapper>
  );
}

const STATUS_COLOR_MAP: { [status in CellStatus]: string } = {
  [CellStatus.Hidden]: "#31485a",
  [CellStatus.Selected]: "#fea112",
  [CellStatus.Revealed]: "#bbceda",
};

const Wrapper = styled.div<{ status: CellStatus }>`
  background: ${(props) => STATUS_COLOR_MAP[props.status]};
  font-size: inherit;
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: background-color 0.5s ease;
`;
