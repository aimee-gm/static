import { expect } from "chai";

import { getRelativePath } from "./getRelativePath";

describe("getRelativePath()", () => {
  it("should return / folder path for root index.md file", () => {
    expect(getRelativePath("/base/", "/base/index.html")).to.equal("/");
  });

  it("should return the parent folder path for index.md files", () => {
    expect(getRelativePath("/base/", "/base/folder/index.html")).to.equal(
      "/folder/"
    );
  });

  it("should return a generated folder path for non-index.md files", () => {
    expect(getRelativePath("/base/", "/base/folder/example.html")).to.equal(
      "/folder/example/"
    );
  });

  it("should return a path for non-.md files", () => {
    expect(getRelativePath("/base/", "/base/folder/example.yaml")).to.equal(
      "/folder/example/"
    );
  });

  it("should return allow paths to not be cast to a folder", () => {
    expect(
      getRelativePath("/base/", "/base/folder/example.yaml", false)
    ).to.equal("/folder/example");
  });
});
