import React from "react";
import { configure, shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @returns
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter display starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("clicking 'increment' button increments counter display", () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

test("clicking 'decrement' button decrements counter display", () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate("click");
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("clicking 'decrement' button won't decrement counter below zero", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("display warning when trying to decrement counter zero", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  const warning = findByTestAttr(wrapper, "warning").text();
  expect(warning).toBe("Cannot decrement below zero");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("remove warning when 'increment' button is clicked", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate("click");
  const warning = findByTestAttr(wrapper, "warning");
  expect(warning).toEqual({});
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});
