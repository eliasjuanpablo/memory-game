import { useState } from "react";
import styled from "styled-components";

export default function RadioGroup<T>(props: {
  label: string;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  value: T;
}) {
  const { label, options, onChange } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>();
  return (
    <Wrapper>
      <Label>{label}</Label>
      <OptionsWrapper>
        {options.map(({ label, value }, index) => (
          <Option
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              onChange(value);
            }}
            selected={props.value === value || selectedIndex === index}
          >
            {label}
          </Option>
        ))}
      </OptionsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Label = styled.div`
  display: block;
  margin-bottom: 0.5em;
  color: ${(props) => props.theme.colors.secondary};
`;
const OptionsWrapper = styled.div`
  display: flex;

  & > * + * {
    margin-left: 0.5em;
  }
`;
const Option = styled.div<{ selected: boolean }>`
  padding: 0.5em 2em;
  background: ${(props) =>
    props.selected ? props.theme.colors.secondary : "#bcceda"};
  color: ${(props) => props.theme.colors.neutral};
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
`;
