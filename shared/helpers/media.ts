export type InlineImagePart = {
  inlineData: {
    mimeType: string;
    data: string;
  };
};

export type TextPart = {
  text: string;
};

export function buildInlineImagePart(dataUrl: string): InlineImagePart | TextPart {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);

  if (!match?.[1] || !match[2]) {
    return { text: "Image was provided, but it was not a valid base64 data URL." };
  }

  return {
    inlineData: {
      mimeType: match[1],
      data: match[2],
    },
  };
}
