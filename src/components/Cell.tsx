import styled from "styled-components";
import icons from "../icons";
import { CellStatus, ICell, ITheme } from "../types";

type CellProps = ICell & { onClick: Function; useIcons: boolean };

export default function Cell(props: CellProps) {
  const { value, onClick, status, useIcons } = props;
  const Icon = icons[value];

  const isVisible = [CellStatus.Revealed, CellStatus.Selected].includes(status);

  const content = useIcons ? (
    <IconWrapper>
      <Icon />
    </IconWrapper>
  ) : (
    value
  );

  return (
    <Wrapper
      onClick={() => {
        onClick();
      }}
      status={status}
    >
      {isVisible && content}
    </Wrapper>
  );
}

function getStatusColorMap(status: CellStatus, theme: ITheme): string {
  const mapping = {
    [CellStatus.Hidden]: theme.colors.secondary,
    [CellStatus.Selected]: theme.colors.primary,
    [CellStatus.Revealed]: theme.colors.grey,
  };

  return mapping[status];
}

const Wrapper = styled.div<{ status: CellStatus }>`
  background: ${(props) => getStatusColorMap(props.status, props.theme)};
  font-size: inherit;
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.neutral};
  transition: background-color 0.5s ease;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  color: ${(props) => props.theme.colors.neutral};
  padding: 0.3em;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 100%;
  }
`;
