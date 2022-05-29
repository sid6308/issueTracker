import { render, screen } from "./test-utils";
import Register from "../Register";

describe("Login Test Suite", () => {
  beforeEach(() => {
    render(<Register />);
  });
  test("Login Form has a heading", () => {
    const heading = screen.getByText("Sign Up Form");
    expect(heading).toBeInTheDocument();
  });
  test("No of text box", () => {
    const textb = screen.getAllByRole("textbox");
    expect(textb).toHaveLength(5);
  });
  test("Button name", () => {
    const butt = screen.getByRole("button", { name: "Register" });
    expect(butt).toBeVisible();
    expect(butt).toBeEnabled();
  });
});
