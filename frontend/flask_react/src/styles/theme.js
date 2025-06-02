const fontGenerator = (
  fontFamily,
  fontSize = '1rem', //기본폰트크기
  fontWeight = '400', //기본두께
  lineHeight = '1.5', // 행간140% 원래기본은 1.5
  letterSpacing = 'normal' //자간-2.5% 원래기본은 normal
) => ({
  'font-family': fontFamily,
  'font-size': fontSize,
  'font-weight': fontWeight,
  'line-height': lineHeight,
  'letter-spacing': letterSpacing,
});
export const theme = {
  colors: {
    // 아래와같이 사용가능
    // color: ${({ theme }) => theme.colors.색상};

    //나중에 필요시 추가하기
    bg: '#d4d4d4', //배경색
    mainColor: '#FF6E3F', //메인컬러
    pageBgColor: '#FAFAFC', //페이지 기본 회색 배경색
    default: '#000000', // 기본 검정색
    testBgColor: '#FFF7F7', //테스트페이지 배경색 연핑크

    //디자인시스템 메인컬러 종류
    orange: '#FF6E3F', //위에 mainColor와 같음
    //디자인시스템 글씨색 설정
    white: '#FFFFFF',
    black: '#1C1C1E',
    text: '#2A2A2A',
    gray03: '#3A3A3C',
    gray02: '#636366',
    gray01: '#9C9CA1',
    gray400: '#8490A0',
    gray600: '#333D4B',
  },

  fonts: {
    //기본 설정해둠 프리텐다드로
    default: fontGenerator(
      'SUIT-Regular',
      '1rem',
      '400',
      '1.5',
      'normal'
    ),

    // SUIT 폰트 설정 (아래처럼사용가능)
    // font-family: ${({ theme }) => theme.fonts.SUIT폰트["font-family"]};
    SUITBold: fontGenerator('SUIT-Bold'),
    SUITExtraBold: fontGenerator('SUIT-ExtraBold'),
    SUITExtraLight: fontGenerator('SUIT-ExtraLight'),
    SUITHeavy: fontGenerator('SUIT-Heavy'),
    SUITLight: fontGenerator('SUIT-Light'),
    SUITMedium: fontGenerator('SUIT-Medium'),
    SUITRegular: fontGenerator('SUIT-Regular'),
    SUITSemiBold: fontGenerator('SUIT-SemiBold'),
    SUITThin: fontGenerator('SUIT-Thin'),
  },
};
