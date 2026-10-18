String messageFor(String code) {
  switch (code) {
    case "USERNAME_TAKEN":
      return "Username นี้ถูกใช้ไปแล้ว";
    case 'EMAIL_TAKEN':
      return 'Email นี้ถูกใช้แล้ว';
    case 'INVALID_CREDENTIALS':
      return 'Username หรือรหัสผ่านไม่ถูกต้อง';
    case 'VALIDATION_FAILED':
      return 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
    case 'NETWORK_ERROR':
      return 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้';
    default:
      return "ระบบขัดข้อง กรุณาลองใหม่ภายหลัง";
  }
}
