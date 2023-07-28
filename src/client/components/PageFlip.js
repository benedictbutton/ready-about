import React, { useCallback, memo } from 'react';
import HTMLFlipBook from 'react-pageflip';
import useSound from 'use-sound';
import pageFlipSFX from '../../../dist/assets/page-flip-01a.mp3';

const PageFlip = React.forwardRef((props, ref) => {
  const [soundOn, setSoundOn] = React.useState(true);
  const [play] = useSound(pageFlipSFX);

  const onFlip = useCallback(
    e => {
      soundOn && play();
    },
    [play, soundOn],
  );

  return (
    <HTMLFlipBook
      ref={ref}
      onFlip={onFlip}
      width={500}
      height={450}
      size="stretch"
      showCover={false}
      drawShadow={false}
      flippingTime={750}
      useMouseEvents={false}
    >
      {props.children}
    </HTMLFlipBook>
  );
});

export default memo(PageFlip);
