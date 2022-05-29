import { render, screen } from "./test-utils";
import Login from "../Login";
import userEvent from "@testing-library/user-event";

describe("Login Test Suite", () => {
  beforeEach(() => {
    render(<Login />);
  });
  test("Login Form has a heading", () => {
    const heading = screen.getByText("Login Form");
    expect(heading).toBeInTheDocument();
  });
  test("Login form have button Login", () => {
    const butt = screen.getByRole("button", { name: "Login" });
    expect(butt).toBeVisible();
    expect(butt).toBeEnabled();
  });
  test("Login input", () => {
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });
  test("Login input", () => {
    expect(screen.getByTestId("pword")).toBeInTheDocument();
  });
});
