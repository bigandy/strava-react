const durationCalc = (h, m, s) => {
	const hours = (h < 9) ? `0${h}` : h;
	const minutes = (m < 9) ? `0${m}` : m;
	const seconds = (s < 9) ? `0${s}` : s;
	return `${hours}:${minutes}:${seconds}`;
};

export default durationCalc;
