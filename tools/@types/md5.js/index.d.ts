declare module "md5.js" {
  type DigestType = `hex`;

  class md5 {
    update: (arg0: string) => md5;
    digest: (encoding: DigestType) => string;
  }

  export default md5;
}
