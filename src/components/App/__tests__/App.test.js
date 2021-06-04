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
  .reply(200, { author: process.env.AUTHOR, quote: process.env.QUOTE });

const findById = (wrapper, id) => wrapper.find(`[data-testid='${id}']`);

describe("App", () => {
  it("initially renders just the 'testing' environment Envs", async () => {
    const wrapper = mount(<App {...initProps} />);

    await waitForAct(() => {
      wrapper.update();

      expect(findById(wrapper, "public-url").text()).toEqual(
        "http://localhost:3000/api/"
      );
      expect(findById(wrapper, "public-env").text()).toEqual("testing");
      expect(findById(wrapper, "author").text()).toEqual("");
      expect(findById(wrapper, "quote").text()).toEqual("");
      expect(findById(wrapper, "error").text()).toEqual(
        "Error: Request failed with status code 404"
      );
    });
  });

  it("displays the author if the API request succeeds", async () => {
    const wrapper = mount(<App {...initProps} />);

    await waitForAct(() => {
      wrapper.update();

      expect(findById(wrapper, "author").text()).toEqual("Babe Ruth");
      expect(findById(wrapper, "quote").text()).toEqual(
        "Never let the fear of striking out keep you from playing the game."
      );
    });
  });
});
