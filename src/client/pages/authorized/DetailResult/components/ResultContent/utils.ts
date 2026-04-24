interface TagConfig {
  text: string;
  link: string;
}

const tagsConfig: Record<string, TagConfig> = {
  relax: {
    text: "выполнить расслабляющие техники",
    link: "/practices",
  },
};

export const getTagConfig = (tag: string): TagConfig | null => {
  return tagsConfig[tag] || null;
};
