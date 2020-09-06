export const imageToBase64 = (image: Blob): Promise<string> => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.addEventListener("loadend", () => {
      const base64 = reader.result as string;
      const pure = base64.replace("data:image/jpeg;base64,", "");
      resolve(pure);
    });
    reader.addEventListener("error", reject);

    reader.readAsDataURL(image);
  });
};
