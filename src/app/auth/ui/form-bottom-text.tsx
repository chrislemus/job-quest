import { theme } from '@common/theme';
import { Typography } from '@common/ui/atoms';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type FormBottomText = {
  question: string;
  linkText: string;
  linkHref: string;
};

/** Text content to display in the bottom of the forms. */
export function FormBottomText() {
  const urlPath = usePathname();

  const formBottomText: FormBottomText | undefined = useMemo(() => {
    switch (urlPath) {
      case '/auth/login':
        return {
          question: "Don't have an account?",
          linkText: 'Sign up',
          linkHref: '/auth/signup',
        };
      case '/auth/signup':
        return {
          question: 'Already have an account?',
          linkText: 'Log in',
          linkHref: '/auth/login',
        };
      default:
        break;
    }
  }, [urlPath]);

  if (!formBottomText) return <></>;

  return (
    <Typography variant="subtitle2">
      {formBottomText?.question + ' '}
      <Typography
        variant="inherit"
        display="inline"
        component="a"
        href={formBottomText?.linkHref}
        sx={{ textDecoration: 'none', color: 'inherit' }}
        fontWeight={theme.typography.fontWeightBold}
      >
        {formBottomText?.linkText}
      </Typography>
      .
    </Typography>
  );
}
