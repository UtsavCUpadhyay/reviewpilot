import { cookies } from "next/headers";
import { LOCALE_COOKIE, isLocale, type Locale } from "./i18n";

/** Reads the active locale from the cookie (server-side). Defaults to English. */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "en";
}
