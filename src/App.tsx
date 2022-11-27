// import logo from './logo.svg';
import React from 'react';
import style from './App.module.css';
import BulldogTextLogo, { BulldogTextInitialAnimationState } from "./components/BulldogTextLogo/BulldogTextLogo";
import Button from './components/Button/Button';
import Typer from './components/Typer/Typer';
import Static from './components/Static/Static';
import NavPane from './components/NavPane/NavPane';
import config from './config';

function App() {

	const [appHasMounted, setAppHasMounted] = React.useState(false);
	const [buttonOpacity, setButtonOpacity] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(false);
	const [navUrl, setNavUrl] = React.useState<string>();
	const [navPaneLoaded, setNavPaneLoaded] = React.useState(false);

	const mainControlStyle: React.CSSProperties = {
		padding: "20px",
		textAlign: "center",
		opacity: buttonOpacity,
		display: buttonOpacity > 0 ? "block" : "none",
	}

	const socialIconStyle: React.CSSProperties = {
		imageRendering: "pixelated",
	}

	const showMainControls = (startDelay: number) => {
		setTimeout(() => {
			const interval = setInterval(() => {
				setButtonOpacity((prevOpacity) => {
					if (prevOpacity >= 1) {
						clearInterval(interval);
						setAppHasMounted(true);
						return prevOpacity;
					}
					return prevOpacity + 0.25;
				});
			}, 500);
		}, startDelay);
	}

	React.useEffect(() => {
		if (navPaneLoaded) {
			setIsLoading(false);
			setNavPaneLoaded(false);
		}
	}, [navPaneLoaded]);

	const navigateToUrl = (url: string) => {
		// Allow the user to press the back button to return to the main page
		const encodedUrl = encodeURIComponent(url);
		window.history.pushState({}, "", `/${encodedUrl}`);
		setNavUrl(url);
		setNavPaneLoaded(false);
		setIsLoading(true);
	}

	// If the user presses the back button, return to the main page
	React.useEffect(() => {
		window.onpopstate = () => {
			setIsLoading(true);
			setNavUrl(undefined);
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	}, []);

	React.useEffect(() => {
		const path = window.location.pathname.slice(1);
		if (path) {
			navigateToUrl(decodeURIComponent(path));
		}
	}, [window.location]);

	const navButtons = config.links.map((link) => {
		return (
			<Button
				filled
				style={mainControlStyle}
				key={link.text}
				text={link.text}
				onClick={() => navigateToUrl(link.url)}
			/>
		);
	});

	const socialIcons = config.social.map((social) => {
		return (
			<a
				href={social.url}
				target="_blank"
				rel="noopener noreferrer"
				key={social.key}
			>
				<img
					src={
						`/icons/${social.key}.png`
					}
					alt={social.key}
					style={socialIconStyle}
					width="32"
				/>
			</a>
		)
	});

	const controls = (
		<>
			<h1 className={style.mainHeader}>
				<Typer
					text='Mr. Bullsec'
					cursor={true}
					speed={150}
					delay={appHasMounted ? 0 : 3000}
					hideCursorBeforeWrite
				/>
			</h1>
			<div className={style.buttonControls}>
				{navButtons}
			</div>
			<div className={style.socialButtonContainer} style={{ opacity: buttonOpacity }}>
				{socialIcons}
			</div>
		</>
	)

	const showMain = !isLoading && !navUrl;

	return (
		<>
			{!navUrl && <div className={style.crt}>
				{showMain &&
					<BulldogTextLogo
						initialAnimationState={
							appHasMounted
								? BulldogTextInitialAnimationState.Transparent
								: BulldogTextInitialAnimationState.Animated
						}
						onShowComplete={() => { showMainControls(750) }}
					/>
				}
				{showMain && controls}
			</div>}
			{isLoading && <Static />}
			{navUrl &&
				<NavPane
					url={navUrl}
					onLoad={() => {
						setNavPaneLoaded(true)
					}}
					minimumLoadTime={500}
					style={{
						display: isLoading ? "none" : "block",
					}} />
			}
		</>
	);
}

export default App;
