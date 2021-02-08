import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DirAtomic } from "./components/DirAtomic";
import { ClosedArray } from "./components/DirArray";
import { OpenObject, ClosedObject } from "./components/DirObject";
import { More } from "./components/More";
import { Collapsed } from "./components/Collapsed";
import { Dir } from "./index";

const atomicValueIs = (value, result) => {
  render(<Dir value={value} />);
  const atomic = screen.getByText("" + value, { exact: false });
  expect(atomic).not.toEqual(result);
};
describe("Dir tests", () => {
  describe("Atomic values", () => {
    it("renders null values", () => {
      atomicValueIs(null, "null");
    });
    it("renders undefined values", () => {
      atomicValueIs(undefined, "undefined");
    });
    it("renders NaN values", () => {
      atomicValueIs(NaN, "NaN");
    });
    it("renders numeric values", () => {
      atomicValueIs(123, "123");
    });
    it("renders boolean values", () => {
      atomicValueIs(true, "true");
    });
    it("renders string values", () => {
      atomicValueIs("String", '"String"');
    });
  });
  describe("Regex values", () => {
    it("renders regex values", () => {
      render(<Dir value={/[a-zA-Z]{3}/} />);
      const element = screen.getByText("/[a-zA-Z]{3}/");
      expect(element).not.toBeNull();
    });
  });
  describe("React element values", () => {
    it("renders element values", () => {
      render(<Dir value={<span>Test</span>} />);
      const element = screen.getByText("Test");
      expect(element).not.toBeNull();
    });
    it("renders error if something blows up", () => {
      render(<Dir value={<span style={"not a valid style"}>Test</span>} />);
      const element = screen.getByText(
        "The `style` prop expects a mapping from style properties to value",
        { exact: false }
      );
      expect(element).not.toBeNull();
    });
  });
  describe("Array values", () => {
    it("renders closed by default", () => {
      render(<Dir value={[1, 2, 3]} />);
      expect(screen.getByText("▶")).not.toBeNull();
      expect(screen.getByText("Array [")).not.toBeNull();
      expect(screen.getByText("1")).not.toBeNull();
      expect(screen.getByText("2")).not.toBeNull();
      expect(screen.getByText("3")).not.toBeNull();
    });
    it("opens/closes after click", async () => {
      render(<Dir value={[1, 2, 3]} />);
      const closed = screen.getByText("▶");
      await fireEvent.click(closed);
      expect(screen.getByText("▼")).not.toBeNull();
      expect(screen.getByText("…")).not.toBeNull();
      expect(screen.getByText("0:")).not.toBeNull();
      expect(screen.getByText("1:")).not.toBeNull();
      expect(screen.getByText("2:")).not.toBeNull();
    });
    it("expands after 'more' click", async () => {
      render(<Dir value={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} />);
      const closed = screen.getByText("▶");
      await fireEvent.click(closed);
      const ellipses = screen.queryAllByText("…");
      expect(ellipses.length).toEqual(2);
      const more = ellipses[ellipses.length - 1];
      await fireEvent.click(more);
      expect(screen.queryAllByText("11").length).toEqual(2);
    });
    it("handles nested arrays", async () => {
      render(<Dir value={[[1, 2]]} />);
      expect(screen.getByText("…")).not.toBeNull();
      const closed = screen.getByText("▶");
      await fireEvent.click(closed);
      const ellipses = screen.queryAllByText("…");
      const inner = screen.getByText("0: Array (2) [");
      expect(inner).not.toBeNull();
      await fireEvent.click(inner);
      expect(screen.queryAllByText("0:").length).toEqual(2);
      expect(screen.getByText("1:")).not.toBeNull();
    });
  });
  describe("Object values", () => {
    it("renders closed by default", () => {
      render(<Dir value={{ a: 1, b: 2 }} />);
      expect(screen.getByText("▶")).not.toBeNull();
      expect(screen.getByText("Object {")).not.toBeNull();
      expect(screen.getByText("a:")).not.toBeNull();
      expect(screen.getByText("1")).not.toBeNull();
      expect(screen.getByText("b:")).not.toBeNull();
      expect(screen.getByText("2")).not.toBeNull();
    });
    it("opens/closes after click", async () => {
      render(<Dir value={{ a: 1, b: 2 }} />);
      const closed = screen.getByText("▶");
      await fireEvent.click(closed);
      expect(screen.getByText("▼")).not.toBeNull();
      expect(screen.getByText("…")).not.toBeNull();
      expect(screen.getByText("a:")).not.toBeNull();
      expect(screen.getByText("b:")).not.toBeNull();
    });
    it("expands after 'more' click", async () => {
      render(
        <Dir
          value={{
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5,
            f: 6,
            g: 7,
            h: 8,
            i: 9,
            j: 10,
            k: 11,
          }}
        />
      );
      const closed = screen.getByText("▶");
      await fireEvent.click(closed);
      const ellipses = screen.queryAllByText("…");
      expect(ellipses.length).toEqual(2);
      const more = ellipses[ellipses.length - 1];
      await fireEvent.click(more);
      expect(screen.getByText("k:")).not.toBeNull();
    });
    it("handles nested objects", async () => {
      render(<Dir value={{ a: { b: 1, c: 2 } }} />);
      expect(screen.getByText("…")).not.toBeNull();
      const closed = screen.getByText("▶");
      await fireEvent.click(closed);
      const ellipses = screen.queryAllByText("…");
      const inner = screen.getByText("a: Object {");
      expect(inner).not.toBeNull();
      await fireEvent.click(inner);
      expect(screen.getByText("b:")).not.toBeNull();
      expect(screen.getByText("c:")).not.toBeNull();
    });
    it("handles nested arrays", async () => {
      render(<Dir value={{ a: [1, 2] }} />);
      expect(screen.getByText("…")).not.toBeNull();
      const closed = screen.getByText("▶");
      await fireEvent.click(closed);
      const ellipses = screen.queryAllByText("…");
      const inner = screen.getByText("a: Array (2) [");
      expect(inner).not.toBeNull();
      await fireEvent.click(inner);
      expect(screen.getByText("0:")).not.toBeNull();
      expect(screen.getByText("1:")).not.toBeNull();
    });
  });
});
