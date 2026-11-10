export const fileUrl = (filename: string) =>
  `${process.env.NEXT_PUBLIC_API_URL}/files/${filename}`;
