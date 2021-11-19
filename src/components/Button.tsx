import styled from "styled-components";

const Button = styled.button<{
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}>`
  background: orange;
  border: 0;
  border-radius: 10px;
  color: white;
  padding: 0.5em 1em;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  ${(props) => props.fullWidth && "width: 100%"}
  ${(props) => props.variant === "secondary" && "background: #bbceda"}
`;

export default Button;
