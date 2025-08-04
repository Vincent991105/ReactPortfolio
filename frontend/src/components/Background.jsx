function Background(){
    return(<div className="Background">
            <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="537" viewBox="0 0 1440 537" fill="none">
                <path d="M1440 28.5C1288.33 -3.16667 917.5 -31.4 647.5 109C310 284.5 657 424.5 347 512.5C99 582.9 12.3333 462.833 0 394" stroke="url(#paint0_linear_12_12)" strokeWidth="5"/>
                <defs>
                    <linearGradient id="paint0_linear_12_12" x1="1440" y1="20.5" x2="6.27015e-06" y2="450" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="white" stopOpacity="0">
                            <animate 
                                attributeName="offset" 
                                from="-0.4" 
                                to="1.1" 
                                dur="15s" 
                                repeatCount="indefinite" />
                        </stop>
                        <stop offset="0.5" stopColor="white" stopOpacity="0.6">
                            <animate 
                                attributeName="offset" 
                                from="0" 
                                to="1.5" 
                                dur="15s" 
                                repeatCount="indefinite" />
                        </stop>
                        <stop offset="1" stopColor="white" stopOpacity="0">
                            <animate 
                                attributeName="offset" 
                                from="0.4" 
                                to="1.9" 
                                dur="15s" 
                                repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>)
}

export default Background
