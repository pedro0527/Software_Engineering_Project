import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
    //뷰포트 동적계산을 위한변수
    --vh: 100%;
}

*{box-sizing:border-box}
body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, input, legend, li, ol, p, select, table, td, textarea, th, ul {margin:0;padding:0}
body, button, input, select, table, textarea {font-size:12px;line-height:1.5; letter-spacing: normal; color:#202020;font-family: "SUIT-Regular", -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", helvetica, sans-serif}
h1, h2, h3, h4, h5, h6 {font-size:inherit;line-height:inherit}
textarea {-webkit-backface-visibility:hidden;backface-visibility:hidden;background-color:transparent;border:0;word-break:keep-all;word-wrap:break-word}
button, input {-webkit-border-radius:0;border-radius:0;border:0}
button {background-color:transparent}
fieldset, img {border:0}
img {vertical-align:top}
ol, ul {list-style:none}
address, em {font-style:normal}
a {display:flex;text-decoration:none;}
iframe {overflow:hidden;margin:0;border:0;padding:0;vertical-align:top}
mark {background-color:transparent}
i {font-style:normal}

#root {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	min-height: calc(var(--vh, 1vh) * 100);
}
// SUIT 폰트 설정
@font-face {
    font-family: "SUIT-Bold";
    src: url("/fonts/SUIT-Bold.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-ExtraBold";
    src: url("/fonts/SUIT-ExtraBold.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-ExtraLight";
    src: url("/fonts/SUIT-ExtraLight.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-Heavy";
    src: url("/fonts/SUIT-Heavy.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-Light";
    src: url("/fonts/SUIT-Light.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-Medium";
    src: url("/fonts/SUIT-Medium.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-Regular";
    src: url("/fonts/SUIT-Regular.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-SemiBold";
    src: url("/fonts/SUIT-SemiBold.otf") format("opentype");
    font-style: normal;
}

@font-face {
    font-family: "SUIT-Thin";
    src: url("/fonts/SUIT-Thin.otf") format("opentype");
    font-style: normal;
}
// 초기 html 설정
html {
	background-color: ${({ theme }) => theme.colors.bg};
	display: flex;
	justify-content: center;
	align-items: center;

	-webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgb(0 0 0 / 0%);
    scroll-behavior: smooth; 

	@media (max-width: 360px) {
		font-size:12px;
	}
}

body {
	width: 100%;
	max-width: 540px;
	overflow-x: hidden;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.default};
	font-family: "SUIT-Regular", "SUIT-SemiBold", "SUIT-Medium", sans-serif;

}

`;

export default GlobalStyle;
