import { render, screen } from "./test-utils";
import App from "../app";

describe("Login Test Suite", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Login Form has a heading", () => {
    const heading = screen.getByText("Tracker");
    expect(heading).toBeInTheDocument();
  });
});
