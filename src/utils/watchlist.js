
const KEY = "watchlist";

export function getWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveWatchlist(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
 
  window.dispatchEvent(new Event("watchlist-updated"));
}

export function isInWatchlist(id, type) {
  return getWatchlist().some((i) => i.id === id && i.type === type);
}

export function addToWatchlist(item) {
  const list = getWatchlist();
  if (!isInWatchlist(item.id, item.type)) {
    saveWatchlist([...list, item]);
  }
}

export function removeFromWatchlist(id, type) {
  const list = getWatchlist().filter((i) => !(i.id === id && i.type === type));
  saveWatchlist(list);
}

export function toggleWatchlist(item) {
  if (isInWatchlist(item.id, item.type)) {
    removeFromWatchlist(item.id, item.type);
  } else {
    addToWatchlist(item);
  }
}
