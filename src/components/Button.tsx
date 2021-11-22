import styled from "styled-components";

const Button = styled.button<{
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}>`
  background: ${(props) => {
    switch (props.variant) {
      case "secondary":
        return props.theme.colors.grey;
      default:
        return props.theme.colors.primary;
    }
  }};
  border: 0;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.neutral};
  padding: 0.5em 1em;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  ${(props) => props.fullWidth && "width: 100%"}
`;

export default Button;
