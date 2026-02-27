import { format } from "date-fns";

//форматирование даты
export const dateFormat = (date: Date | string | null | undefined) =>
  date !== null && date !== undefined
    ? format(new Date(date), "yyyy-MM-dd")
    : "";

//валидатор ИНН
export function validateInnUL(inn: string | number): boolean {
  let result = false;
  if (typeof inn === "number") {
    inn = inn.toString();
  } else if (typeof inn !== "string") {
    inn = "";
  } else {
    const checkDigit = (inn: string, coefficients: number[]): number => {
      let n = 0;
      for (let i = 0; i < coefficients.length; i++) {
        n += coefficients[i] * parseInt(inn[i]);
      }
      return (n % 11) % 10;
    };
    const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
    if (n10 === parseInt(inn[9])) {
      result = true;
    }
  }
  return result;
}

//токен
export function getAccessToken(): string | null {
  const tokenData = localStorage.getItem("tokenData");
  if (tokenData) {
    const { accessToken } = JSON.parse(tokenData);
    return accessToken;
  }
  return null;
}

//очистка текста
export function parseText(textData: string) {
  const data = textData;
  const div = document.createElement("div");
  div.innerHTML = data;
  const text = div.textContent || div.innerText || "";
  return text;
}

//поиск изображений в статье, чтобы использовать их как обложку
export function findImgInArticle(innerHtml: string): string | undefined {
  const parser = new DOMParser();
  const doc = parser.parseFromString(innerHtml, "text/html");
  const images = doc.querySelectorAll("img");
  const foundImages = Array.from(images).map((img) => img.src);
  return foundImages[0];
}

//очистка статьи от изображений после того, как нашли обложку для статьи
export function removeImages(textToClean: string): string {
  const imgRegex = /<img[^>]*>/gi;
  return textToClean.replace(imgRegex, "");
}

//валидатор телефона
export function isPhoneNumber(input: string) {
  const trimmedInput = input.trim().replace(/ /g, "");
  return /^\d{0,15}$/.test(trimmedInput) || /^(\+7)/.test(trimmedInput);
}

//форматирование телефона
export function phoneNumberFormat(input: string) {
  const trimmedInput = input.trim().replace(/(?!^\+)\D/g, "");
  if (trimmedInput.length < 2) {
    return `${trimmedInput}`;
  }
  if (trimmedInput.length < 3) {
    return `${trimmedInput.slice(0, 2)} ${trimmedInput.slice(2)}`;
  }
  return `${trimmedInput.slice(0, 2)} ${trimmedInput.slice(
    2,
    5
  )} ${trimmedInput.slice(5, 8)} ${trimmedInput.slice(
    8,
    10
  )} ${trimmedInput.slice(10, 12)} ${trimmedInput.slice(12)}`;
}

//валидатор телефона
export function isValidPhoneNumber(input: string) {
  const trimmedInput = input.trim().replace(/(?!^\+)\D/g, "");
  return trimmedInput.match(
    /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/
  );
}
