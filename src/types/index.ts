export interface IAppConfig {
  siteTitle: string;
  appName: string;
  domain: string;
  logoUrl: string;
  apiHost: string;
  recaptchaSiteKey: string;
}

export interface LayoutProps {
	className?: string;
  children?: React.ReactNode;
}

export interface LayoutContainerProps {
  ChildComponent: React.ComponentType;
  authenticate?: boolean;
  roles?: string[];
  capabilites?: string[];
  layoutName?: string;
  layoutProps?: LayoutProps;
  title?: string; // page title
}