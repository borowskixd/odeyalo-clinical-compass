export const toGridTemplateAreas = (sectionsCount: number): string => {
  let result = ``;

  for (let i = 0; i < sectionsCount; i += 2) {
    if (i + 1 >= sectionsCount) {
      result += `
        "title${i} title${i}"
        "field${i} field${i}"
        "hint${i} hint${i}"
      `;
    } else {
      result += `
        "title${i} title${i + 1}"
        "field${i} field${i + 1}"
        "hint${i} hint${i + 1}"
      `;
    }
  }

  return result;
};
