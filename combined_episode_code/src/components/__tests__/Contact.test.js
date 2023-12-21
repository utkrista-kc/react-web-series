import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page Test Case", () => {
  test("Should load contact us component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading"); // It will find all the heading syntax

    expect(heading).toBeInTheDocument(); // Finds out whether the heading was inside the screen or not
  });

  test("Should load button inside contact component", () => {
    render(<Contact />);

    const button = screen.getByRole("button"); // It will find all the button syntax

    expect(button).toBeInTheDocument(); // Finds out whether the button was inside the screen or not
  });

  test("Should load input name inside Contact component", () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText("name");

    expect(inputName).toBeInTheDocument();
  });

  it("Should load 2 input boxes in the Contact Component", () => {
    render(<Contact />);

    // Quering
    const inputBoxes = screen.getAllByRole("textbox"); // When multiple items we use getAll

    console.log(inputBoxes.length); // An array is returned of React virtual DOM element

    expect(inputBoxes.length).toBe(2);
  });
});
