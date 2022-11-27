import React from 'react';
import style from "./BulldogTextLogo.module.css";
import useScreenType from '../../hooks/useScreenType/useScreenType';
import { emit } from 'process';
const bulldogText = `                                                                                
            @@@@@@                                              @@@@@           
       @@@@@@@@@@@@@@@@                                    @@@@@@@@@@@@@@@      
   @@@@@@@@@@@@@@     @@@@                              @@@     .@@@@@@@@@@@@@  
 @@@@@@@@@@@@            @@@                          @@@           @@@@@@@@@@@@
   @@@@@@@              @@@@ @@@@@@@@  @@@%  @@@@@@@( @@@@              @@@@@@@ 
        .@@         *@@@@@@        @@@@ @@@@@@@        @@@@@@          @@       
        @@        @@@@  @@@@@@@@@@@            @@@@@@@@@@   @@@@       @@       
       @@@     @@@@  @    @@@@@@@@@@@ ,@@@@ @@@@@@@@@@@    @  @@@@      @@      
      @@@     @@@  @ @@@@@* @@@@   @@@     @@@   @@@@  @@@@@    #@@@     @@@    
     @@@    @@@   @@@@@@    @@@@@  @@@      @@@ @@@@@     @@@@@   @@@     @@    
     @@@&  @@@  @@@           @@@@@@@@@@@@@@@@@@ @@    @       @@  @@@   @@@    
       @@@ @@  @@            @@@@@@@@@@@@@@@@@@@ @@@@           @@@ @@@@@@      
          @@  @@ @@   @@   @@@ @@@@            @@@@@@@@  .@.  @@  @@ @@@@       
        @@@@  @@  %@@@@ @@@@@@@@@  @             @@@@ @@@ @@@@@   @@  @@ @      
         @@   @@      @@@ @@@@@           @       @@@@@@@@@      @@   @@@@      
       @@@@  @@@    &@@@@@@@@ @@@@  @           @@@ @@@@@@@@@    @@@   @@@      
       @@@  @@@@   @@ @@@@@@@@           @          @@@@@@@@@@@   @@@  @@@@     
       @@@ @@@@  @@@@@@@ @@@ @@@@@@@@@@@ @@@@@@@@@@@ @@@  @@@(@@@  @@@  @@@     
       @@       @@ @@  @@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@ @@@@ @@@@@@      @@@     
       @@      @@ @@  @@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@& @@  @@     @@@     
       @@@    @@ #@@  @@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@@ @@@  @@ @@     @@      
        @@.   @@@@ @@@@ @@@@@@@@@@@@          @@@@@@@@@@@/@@@ /@@ @    @@       
         @@    @*@@ @@  @@@@@@@@@               @@@@@@@@@@ @@  @@%@   @@        
          @@   @@@@@@@@  @@@@@@   @@@@@    @@ @   (@@@@@  @@@@@@@@   @@         
           @@#  @ @@@@@@@@@@   @  @@         @@@ ,    @@@@@@ @@@@   @@          
            @@@  % @@@@@@@@@@@                     @@@@@@@@@@@@/  @@@           
               @   @@@@@@@@@@@@                   @@@@@@@@@@@@@  @              
                   @@@@@@@@.                          @@@@@@@@                  
                     @@@@@                             @@@@@                    
`;

const bulldogTextSplit = bulldogText.split('\n');


type bullDogLogoProps = {
	/**
	 * The intial animation state of the logo
	 */
	initialAnimationState: BulldogTextInitialAnimationState;

	/**
	 * A function to call after the show animation has completed, and as the hide animation begins
	 * @default undefined
	 */
	onShowComplete?: () => void;
}

export enum BulldogTextInitialAnimationState {
	Animated = "animated",
	Opaque = "opaque",
	Transparent = "transparent"
}



function BulldogTextLogo(props: bullDogLogoProps) {

	const {
		initialAnimationState,
		onShowComplete = () => { },
	} = props;

	const screenType = useScreenType();

	const [currentBulldogText, setCurrentBulldogText] = React.useState("");
	const [currentBulldogTextOpacity, setCurrentBulldogTextOpacity] = React.useState(1);

	const drawBulldogText = (delayStart: number) => {
		return new Promise((resolve, reject) => {
			const drawBulldogTextIndex = (index: number) => {
				const currentText = bulldogTextSplit.slice(0, index);
				const remainingBlankLines = bulldogTextSplit.length - currentText.length;
				const blankLines = Array(remainingBlankLines).fill("");
				setCurrentBulldogText(currentText.concat(blankLines).join('\n'));
				if (index < bulldogTextSplit.length) {
					setTimeout(() => {
						drawBulldogTextIndex(index + 1);
					}, 50);
				} else {
					resolve(null);
				}
			}
			setTimeout(() => {
				drawBulldogTextIndex(0);
			}, delayStart);
		});
	}

	const fadeBulldogText = (delayStart: number) => {
		return new Promise((resolve, reject) => {
			const fadeBulldogTextIndex = (index: number) => {
				setCurrentBulldogTextOpacity(index);
				if (index > 0.25) {
					setTimeout(() => {
						fadeBulldogTextIndex(index - 0.25);
					}, 300);
				} else {
					resolve(null);
				}
			}

			setTimeout(() => {
				fadeBulldogTextIndex(0.85);
			}, delayStart);
		});
	}

	const playIntro = async () => {
		await drawBulldogText(0);
		onShowComplete();
		await fadeBulldogText(1000);
	}

	React.useEffect(() => {
		if (initialAnimationState == BulldogTextInitialAnimationState.Animated) {
			playIntro();
		} else if (initialAnimationState == BulldogTextInitialAnimationState.Opaque) {
			setCurrentBulldogText(bulldogText);
			setCurrentBulldogTextOpacity(1);
		} else if (initialAnimationState == BulldogTextInitialAnimationState.Transparent) {
			setCurrentBulldogText(bulldogText);
			setCurrentBulldogTextOpacity(0.15);
		}
	}, [initialAnimationState]);


	const fontSize = screenType === "mobile" ? "1.3vw" : "1rem";


	return <div
		className={style.root}
		style={{
			opacity: currentBulldogTextOpacity,
			fontSize: fontSize,
		}}>
		<pre>
			{currentBulldogText}
		</pre>
	</div>
}

export default BulldogTextLogo;