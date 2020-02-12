import { expect } from "chai";

import { getOutputPath } from "./getOutputPath";

describe("getOutputPath()", () => {
  it("should return the passed path for .html files", () => {
    expect(getOutputPath("/base/", "/folder/file.html")).to.equal(
      "/base/folder/file.html"
    );
  });

  it("should return a directory as the index.html file", () => {
    expect(getOutputPath("/base/", "/folder/")).to.equal(
      "/base/folder/index.html"
    );
  });

  it("should return /index.html for the base path", () => {
    expect(getOutputPath("/base/", "/")).to.equal("/base/index.html");
  });

  it("should throw an error when missing a leading slash", () => {
    expect(() => getOutputPath("/base", "folder/file.html")).to.throw();
  });

  it("should throw an error when missing a file extension", () => {
    expect(() => getOutputPath("/base", "/folder/file")).to.throw();
  });

  it("should throw an error when the file extension is not recognised", () => {
    expect(() => getOutputPath("/base", "/folder/file.txt")).to.throw();
  });
});
