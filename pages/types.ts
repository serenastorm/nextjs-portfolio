export interface LinkProps {
    label: string;
    description: string;
    url: string;
    isExternal?: boolean;
  }
  
  export interface AnimatedLinkProps extends LinkProps {
    animationDelay: number;
  }
  
  export type ScreenReaderLinkProps = {
    text: string;
    url: string;
    label: string;
  };
  