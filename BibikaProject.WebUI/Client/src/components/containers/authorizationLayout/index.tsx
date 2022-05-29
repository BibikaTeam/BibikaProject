import React, { Children, FC } from 'react';

const AuthorizationLayout: FC = (props) => {
    return (
        <div className='auth-container'>
            <div className='left-side'>
                <svg width="20svw" height="20vh" viewBox="0 0 233 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M233 116.5C233 85.6023 220.726 55.9701 198.878 34.1221C177.03 12.2741 147.398 2.33271e-06 116.5 0C85.6023 -2.33271e-06 55.9701 12.2741 34.1221 34.1221C12.2741 55.97 4.66543e-06 85.6023 0 116.5H34.95C34.95 94.8716 43.5419 74.129 58.8355 58.8354C74.129 43.5418 94.8716 34.95 116.5 34.95C138.128 34.95 158.871 43.5419 174.165 58.8354C189.458 74.129 198.05 94.8716 198.05 116.5H233Z" fill="white"/>
                    <path d="M36 116.5C36 137.85 44.4812 158.325 59.5779 173.422C74.6746 188.519 95.1501 197 116.5 197C137.85 197 158.325 188.519 173.422 173.422C188.519 158.325 197 137.85 197 116.5L164.8 116.5C164.8 129.31 159.711 141.595 150.653 150.653C141.595 159.711 129.31 164.8 116.5 164.8C103.69 164.8 91.4047 159.711 82.3467 150.653C73.2887 141.595 68.2 129.31 68.2 116.5H36Z" fill="white"/>
                    <path d="M165 116.5C165 103.637 159.89 91.3008 150.795 82.2053C141.699 73.1098 129.363 68 116.5 68C103.637 68 91.3008 73.1098 82.2053 82.2053C73.1098 91.3008 68 103.637 68 116.5L92.25 116.5C92.25 110.068 94.8049 103.9 99.3527 99.3527C103.9 94.8049 110.068 92.25 116.5 92.25C122.932 92.25 129.1 94.8049 133.647 99.3527C138.195 103.9 140.75 110.068 140.75 116.5H165Z" fill="white"/>
                </svg>
            </div>
            <div className='right-side'>
                <>
                    {props.children}
                </>
            </div>
        </div>
        
    );
};

export default AuthorizationLayout;