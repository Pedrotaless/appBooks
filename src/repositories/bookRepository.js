import { booksSeed } from "../database/booksSeed";

export function getInitialBooks() {
  return booksSeed;
}