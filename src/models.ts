export class Gif {
  mp4Url: string = '';
  bitlyUrl: string = '';

  constructor(mp4?: string, bitly?: string) {
    this.mp4Url = mp4 === undefined ? '' : mp4;
    this.bitlyUrl = bitly === undefined ? '' : bitly;
  }
}
