export const uploadMedia = (mediaData: string) => {
  return fetch(`https://api.sokontokoro-factory.net/twitter/media/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mediaData }),
  });
};

export const downloadFileWithDom = (file: Blob, name: string) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
};

export const createTicketImage = (text: string): Promise<Blob> => {
  const url = `https://us-central1-replica-ticket.cloudfunctions.net/createImage?text=${text}`;

  const request = new XMLHttpRequest();
  request.responseType = "blob";
  request.open("GET", url);

  return new Promise<Blob>((resolve, reject) => {
    request.addEventListener("load", function () {
      const file = request.response;
      resolve(file);
    });

    request.addEventListener("error", function (e) {
      reject(e);
    });

    request.send();
  });
};

export const issueTwitterIntent = (
  ticketSheetName: string,
  mediaUrl?: string
): void => {
  const baseUrl = `https://twitter.com/intent/tweet`;

  let rawText = `座席「${ticketSheetName}」のチケットを発券しました！
      
「Aqours Back In 5th LoveLive! ～Next SPARKLING!!～」に向けて、レプリカチケットを発券しよう！`;

  let url = encodeURIComponent(`https://replica-ticket.web.app/`);

  // 画像つき共有の場合は、TwitterCard用OGPを設定しない
  if (mediaUrl) {
    rawText += `\n${mediaUrl}`;
    const redirectUrl = `https://replica-ticket.web.app`;
    url = encodeURIComponent(
      `https://api.sokontokoro-factory.net/twitter/share?redirectUrl=${redirectUrl}`
    );
  }
  let text = encodeURIComponent(rawText);

  const hashtags = [
    "lovelive",
    "そこんところ工房",
    "レプリカチケット発券機",
  ].join(",");

  window.open(`${baseUrl}?text=${text}&hashtags=${hashtags}&url=${url}`);
};
