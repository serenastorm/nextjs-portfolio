export interface LinkProps {
  label: string;
  description: string;
  url: string;
  isExternal?: boolean;
}

export type ScreenReaderLinkProps = {
  text: string;
  url: string;
  label: string;
};
