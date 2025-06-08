export const convertNumbers = (number) => {
    if (number >= 1e12) return (number / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
    if (number >= 1e9) return (number / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
    if (number >= 1e6) return (number / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
    if (number >= 1e3) return (number / 1e3).toFixed(2).replace(/\.00$/, "") + "K";
    return number.toLocaleString();
}