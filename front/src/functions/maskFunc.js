export const maskForPan = (pan) => {
  if (pan.length > 0) {
    const res = pan
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      .join(" ");
    return res;
  }
};

export const maskForExpire = (expire) => {
  if (expire.length > 0) {
    const res = expire
      .replace(/[/]/g, "")
      .match(/.{1,2}/g)
      .join("/")
      .slice(0, 5);
    return res;
  }
};
