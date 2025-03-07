import qrcode from 'qrcode-terminal';

export default {
    name: 'qr',
    run: (qr: any) => {
      qrcode.generate(qr, { small: true });
    }
  };;
