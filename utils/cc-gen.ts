// utils/cc-gen.ts

// Thuật toán Luhn để kiểm tra và tạo số cuối (Check Digit)
// Nguồn tham khảo: "The Luhn Algorithm: The First Line of Defense"
const calculateLuhn = (str: string): number => {
  let sum = 0;
  let doubleUp = false;

  for (let i = str.length - 1; i >= 0; i--) {
    let cur = parseInt(str.charAt(i));
    if (doubleUp) {
      if ((cur *= 2) > 9) cur -= 9;
    }
    sum += cur;
    doubleUp = !doubleUp;
  }
  return sum % 10;
};

// Hàm tạo 1 thẻ hoàn chỉnh
export const generateCard = (bin: string, month: string, year: string, cvv: string, hasDate: boolean, hasCvv: boolean) => {
  // 1. Xử lý BIN: Nếu trống thì random, nếu có thì giữ nguyên
  let ccNumber = bin.replace(/[^0-9]/g, '');
  if (!ccNumber) ccNumber = '4'; // Mặc định Visa nếu rỗng

  // 2. Random độ dài còn lại (thường là 16 số)
  const length = 16;
  while (ccNumber.length < length - 1) {
    ccNumber += Math.floor(Math.random() * 10).toString();
  }

  // 3. Tính số cuối cùng (Check Digit) để thỏa mãn Luhn
  // "NamsoGen guarantees that every number it produces satisfies this algorithm"
  const sum = calculateLuhn(ccNumber + '0');
  const checkDigit = sum === 0 ? 0 : 10 - sum;
  ccNumber += checkDigit.toString();

  // 4. Tạo Date (Month/Year)
  const genMonth = month === 'Random' ? ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2) : month;
  const currentYear = new Date().getFullYear();
  const genYear = year === 'Random' ? (currentYear + Math.floor(Math.random() * 5)).toString() : year;

  // 5. Tạo CVV
  const genCvv = cvv === 'Rand' || !cvv ? Math.floor(100 + Math.random() * 900).toString() : cvv;

  // 6. Format kết quả theo tùy chọn
  let result = ccNumber;
  if (hasDate) result += `|${genMonth}|${genYear}`;
  if (hasCvv) result += `|${genCvv}`;

  return result;
};
