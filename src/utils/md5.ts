import md5 from "md5";

export const md5Hash = (
  method: string,
  url: string,
  body: string,
  secret: string | null
): string => {
  return md5(method + url + body + secret);
};
