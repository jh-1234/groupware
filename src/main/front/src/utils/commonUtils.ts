// 연락처 포맷팅
export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const len = cleaned.length;

  if (len < 4) return cleaned;
  if (len < 8) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;

  if (cleaned.startsWith("02")) {
    if (len < 10)
      return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}`;

    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}`;
  }

  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
};

// 숫자에 콤마 추가 (천단위)
export const formatPrice = (value: number) => {
  return value.toLocaleString("ko-KR");
};
