export const getFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}