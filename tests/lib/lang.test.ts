import { describe, expect, it } from "vitest";
import {
  DEFAULT_LANG,
  getLangFromPath,
  htmlLang,
  normalizeLang,
  parseLangCookie,
  resolveLang,
} from "@lib/lang";

describe("lang", () => {
  it("uses English as the explicit default", () => {
    expect(DEFAULT_LANG).toBe("en");
    expect(normalizeLang("fr")).toBe("en");
    expect(normalizeLang(undefined)).toBe("en");
    expect(normalizeLang("es")).toBe("es");
  });

  it("reads the language prefix without matching lookalike segments", () => {
    expect(getLangFromPath("/es/")).toBe("es");
    expect(getLangFromPath("/en/about/")).toBe("en");
    expect(getLangFromPath("/english/")).toBeNull();
    expect(getLangFromPath("/")).toBeNull();
  });

  it("parses the selectedLanguage cookie and ignores invalid values", () => {
    expect(parseLangCookie("a=1; selectedLanguage=es; b=2")).toBe("es");
    expect(parseLangCookie("selectedLanguage=fr")).toBeNull();
    expect(parseLangCookie(null)).toBeNull();
  });

  it("resolves preference first, then path, then default", () => {
    expect(resolveLang("es", "/en/about/")).toBe("es");
    expect(resolveLang(null, "/es/about/")).toBe("es");
    expect(resolveLang(null, "/unprefixed/")).toBe("en");
  });

  it("maps document language codes", () => {
    expect(htmlLang("en")).toBe("en-US");
    expect(htmlLang("es")).toBe("es-US");
  });
});
