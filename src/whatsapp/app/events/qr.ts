import qrcode from 'qrcode-terminal';

export default {
    type: 'qr',
    run: (qr: any) => {
      qrcode.generate(qr, { small: true });
    }
  };;
