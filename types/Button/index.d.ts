import Button from 'antd/lib/button';
import type { ButtonProps, ButtonShape, ButtonType, ButtonGroupProps, ButtonSize } from 'antd/lib/button';
import React from 'react';
interface HljButtonProps extends ButtonProps {
    asyncClickAutoLoading?: boolean;
}
interface CompoundedComponent extends React.ForwardRefExoticComponent<HljButtonProps & React.RefAttributes<HTMLElement>> {
    Group: typeof Button.Group;
    __ANT_BUTTON: boolean;
}
declare const HljButton: CompoundedComponent;
export default HljButton;
export type { ButtonProps, ButtonShape, ButtonType, ButtonGroupProps, ButtonSize };
