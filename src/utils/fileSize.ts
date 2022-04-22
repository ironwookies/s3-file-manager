export const fileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
    10,
  );
  return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`;
};

export default {
  fileSize,
};
