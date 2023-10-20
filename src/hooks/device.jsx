import { useEffect, useState } from "react";

const useDevice = () => {
	const [device, setDevice] = useState("desktop");
	const [screenOrientation, setScreenOrientation] = useState("landscape");

	useEffect(() => {
		const handleResize = () => {
			if (navigator.userAgent.match(/Android/i)) {
				setDevice("mobile");
			} else if (navigator.userAgent.match(/webOS/i)) {
				setDevice("mobile");
			} else if (navigator.userAgent.match(/iPhone/i)) {
				setDevice("mobile");
			} else if (navigator.userAgent.match(/iPad/i)) {
				setDevice("tablet");
			} else if (navigator.userAgent.match(/iPod/i)) {
				setDevice("mobile");
			} else if (navigator.userAgent.match(/BlackBerry/i)) {
				setDevice("mobile");
			} else if (navigator.userAgent.match(/Windows Phone/i)) {
				setDevice("mobile");
			} else {
				setDevice("desktop");
			}

			if (window.innerHeight > window.innerWidth) {
				setScreenOrientation("portrait");
			} else {
				setScreenOrientation("landscape");
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return {
		type: device,
		orientation: screenOrientation,
	};
};

export default useDevice;
