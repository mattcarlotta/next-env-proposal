import { mount } from "enzyme";
import waitForAct from "@noshot/utils/waitForAct";
import mockAxios from "../../../utils/mockAxios";
import App from "../index";

const initProps = {
  author: "",
  error: "",
};

mockAxios
  .onGet("quote")
  .replyOnce(404)
  .onGet("quote")
  .replyOnce(404)
  .onGet("quote")
  .reply(200, { author: process.env.AUTHOR, quote: process.env.QUOTE });

const findById = (wrapper, id) => wrapper.find(`[data-testid='${id}']`);

describe("App", () => {
  it("initially renders a loading indictor with 'testing' Envs", async () => {
    const wrapper = mount(<App {...initProps} />);

    expect(findById(wrapper, "loading")).toExist();

    await waitForAct(() => {
      wrapper.update();

      expect(findById(wrapper, "public-url")).toHaveText(
        "http://localhost:3000/api/"
      );

      expect(findById(wrapper, "public-env")).toHaveText("testing");
    });
  });

  it("displays an error if the API request fails", async () => {
    const wrapper = mount(<App {...initProps} />);

    await waitForAct(() => {
      wrapper.update();

      expect(findById(wrapper, "public-url")).toHaveText(
        "http://localhost:3000/api/"
      );
      expect(findById(wrapper, "public-env")).toHaveText("testing");
      expect(findById(wrapper, "error")).toHaveText(
        "Error: Request failed with status code 404"
      );
    });
  });

  it("displays the author and quote if the API request succeeds", async () => {
    const wrapper = mount(<App {...initProps} />);

    await waitForAct(() => {
      wrapper.update();

      expect(findById(wrapper, "loading")).not.toExist();
      expect(findById(wrapper, "author")).toHaveText("Babe Ruth");
      expect(findById(wrapper, "quote")).toHaveText(
        "Never let the fear of striking out keep you from playing the game."
      );
    });
  });
});
