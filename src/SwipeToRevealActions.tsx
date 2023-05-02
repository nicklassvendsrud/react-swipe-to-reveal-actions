import React, { useState, ReactNode, CSSProperties } from 'react';
import { useSwipeable } from 'react-swipeable';
import './styles.css';

type Props = {
    children: ReactNode;
    actionButtons: {
        content: ReactNode;
        onClick: () => void;
        role?: string;
    }[];
    actionButtonMinWidth: number;
    height?: string;
    containerStyle?: CSSProperties;
    onOpen?: () => void;
    onClose?: () => void;
    hideDotsButton?: boolean;
    dotsBtnAriaLabel?: string;
};

const SwipeToRevealActions: React.FC<Props> = ({
    children,
    actionButtons,
    containerStyle,
    actionButtonMinWidth,
    height = '56px',
    hideDotsButton,
    dotsBtnAriaLabel = 'Click to reveal actions',
  onOpen,
  onClose
}: Props) => {
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const handlers = useSwipeable({
        onSwiped: () => handlePanEnd(),
        onSwipeStart: (eventData) => handlePanStart(eventData),
        onSwiping: (eventData) => handleSwipe(eventData),
        trackMouse: true,
    });

    function handlePanStart(e: any) {
        if (e.dir === 'Down' || e.dir === 'Up') {
            setIsScrolling(true);
        }
    }

    function handlePanEnd() {
        setIsScrolling(false);
    }

    function handleSwipe(e: any) {
        if (!isScrolling) {
            if (e.dir === 'Left' && !isExpanded) {
                // LEFT SWIPE...
                setIsExpanded(true);
                if (onOpen) {
                    onOpen();
                }
            } else if (e.dir === 'Right' && isExpanded) {
                // RIGHT SWIPE...
                setIsExpanded(false);
                if (onClose) {
                    onClose();
                }
            }
        }
    }

    function handleActionClicked(callback: () => void) {
        callback();
        setIsExpanded(false);
    }

    return (
        <div className="rstra-container" style={{ height, ...containerStyle }}>
            <div {...handlers}>
                <div>
                    <div className="rstra-actions-container" style={{ height }}>
                        {actionButtons.map((action, index) => (
                            <div key={`actionKey_${index}`} style={{ height }}>
                                <button
                                    className="rstra-action-button"
                                    onClick={() => handleActionClicked(action.onClick)}
                                    style={{
                                        height,
                                        minWidth: actionButtonMinWidth
                                    }}
                                    role={action.role || 'button'}
                                >
                                    {action.content}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div
                      className="rstra-content-container"
                      style={{
                          height,
                          transform: `translateX(${isExpanded ? `-${actionButtons.length * actionButtonMinWidth}px` : '0px'})`,
                      }}
                    >
                        {children}
                        {!hideDotsButton && (
                          <button
                            className="rstra-dots-button"
                            onClick={() => {
                                const shouldClose = isExpanded;
                                setIsExpanded(!shouldClose);
                                if (shouldClose && onClose) {
                                    onClose();
                                } else if (!shouldClose && onOpen) {
                                    onOpen();
                                }
                            }}
                            style={{ height }}
                            aria-label={dotsBtnAriaLabel}
                          >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                          </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwipeToRevealActions;
